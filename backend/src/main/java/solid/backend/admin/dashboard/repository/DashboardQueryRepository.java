package solid.backend.admin.dashboard.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import solid.backend.admin.dashboard.dto.DashboardCategoryStatsDto;
import solid.backend.admin.dashboard.dto.DashboardMonthlyTxDto;
import solid.backend.admin.dashboard.dto.DashboardProductStatsDto;
import solid.backend.admin.dashboard.dto.DashboardWeeklySalesAmtDto;
import solid.backend.entity.QOrders;
import solid.backend.entity.QOrderProduct;
import solid.backend.entity.QOrderTravel;
import solid.backend.entity.QProduct;
import solid.backend.entity.QTravel;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class DashboardQueryRepository {

    private final JPAQueryFactory query;

    public DashboardQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }

    /**
     * 설명 : 이번달 거래 현황
     * @return DashboardMonthlyTxDto
     */
    public DashboardMonthlyTxDto getDashboardMonthlyTxDto() {
        QOrders orders = QOrders.orders;
        QProduct products = QProduct.product;
        QTravel travels = QTravel.travel;
        QOrderProduct orderProducts = QOrderProduct.orderProduct;
        QOrderTravel orderTravels = QOrderTravel.orderTravel;

        // 오늘 날짜 (예: 2025-06-12) -> firstDayOfMonth : 2025-06-01, firstDayOfNextMonth : 2025-07-01
        LocalDate today = LocalDate.now();
        LocalDate firstDayOfMonth = today.withDayOfMonth(1);
        LocalDate firstDayOfNextMonth = firstDayOfMonth.plusMonths(1);

        // 총 거래 수(orderProductAmount + orderTravelAmount)
        Long orderProductTx = query
                .select(orderProducts.orderProductAmount.sum().longValue())
                .from(orderProducts)
                .join(orderProducts.order, orders)
                .where(orders.orderDt.goe(firstDayOfMonth).and(orders.orderDt.lt(firstDayOfNextMonth)))
                .fetchOne();

        Long orderTravelTx = query
                .select(orderTravels.orderTravelAmount.sum().longValue())
                .from(orderTravels)
                .join(orderTravels.order, orders)
                .where(orders.orderDt.goe(firstDayOfMonth).and(orders.orderDt.lt(firstDayOfNextMonth)))
                .fetchOne();

        Long totalTx = (orderProductTx != null ? orderProductTx : 0L) + (orderTravelTx != null ? orderTravelTx : 0L);

        // 거래 취소 수(order_state = 1인 주문들의 orderProductAmount + orderTravelAmount)
        Long cancelProductTx = query
                .select(orderProducts.orderProductAmount.sum().longValue())
                .from(orderProducts)
                .join(orderProducts.order, orders)
                .where(
                        orders.orderState.eq(1)
                                .and(orders.orderDt.goe(firstDayOfMonth))
                                .and(orders.orderDt.lt(firstDayOfNextMonth))
                )
                .fetchOne();

        Long cancelTravelTx = query
                .select(orderTravels.orderTravelAmount.sum().longValue())
                .from(orderTravels)
                .join(orderTravels.order, orders)
                .where(
                        orders.orderState.eq(1)
                                .and(orders.orderDt.goe(firstDayOfMonth))
                                .and(orders.orderDt.lt(firstDayOfNextMonth))
                )
                .fetchOne();

        Long cancelTx = (cancelProductTx != null ? cancelProductTx : 0L) + (cancelTravelTx != null ? cancelTravelTx : 0L);

        // 거래 확정 수(order_state = 1인 주문들을 제외한 orderProductAmount + orderTravelAmount)
        Long completeProductTx = query
                .select(orderProducts.orderProductAmount.sum().longValue())
                .from(orderProducts)
                .join(orderProducts.order, orders)
                .where(
                        orders.orderState.ne(1)
                                .and(orders.orderDt.goe(firstDayOfMonth))
                                .and(orders.orderDt.lt(firstDayOfNextMonth))
                )
                .fetchOne();

        Long completeTravelTx = query
                .select(orderTravels.orderTravelAmount.sum().longValue())
                .from(orderTravels)
                .join(orderTravels.order, orders)
                .where(
                        orders.orderState.ne(1)
                                .and(orders.orderDt.goe(firstDayOfMonth))
                                .and(orders.orderDt.lt(firstDayOfNextMonth))
                )
                .fetchOne();

        Long completeTx = (completeProductTx != null ? completeProductTx : 0L) + (completeTravelTx != null ? completeTravelTx : 0L);

        // 총 매출 금액(order_state = 1인 주문들을 제외한 orderProductAmount * productPrice + orderTravelAmount * travelPrice)
        Long productAmt = query
                .select(orderProducts.orderProductAmount.multiply(products.productPrice).sum().longValue())
                .from(orderProducts)
                .join(orderProducts.product, products)
                .join(orderProducts.order, orders)
                .where(
                        orders.orderState.ne(1)
                                .and(orders.orderDt.goe(firstDayOfMonth))
                                .and(orders.orderDt.lt(firstDayOfNextMonth))
                )
                .fetchOne();

        Long travelAmt = query
                .select(orderTravels.orderTravelAmount.multiply(travels.travelPrice).sum().longValue())
                .from(orderTravels)
                .join(orderTravels.travel, travels)
                .join(orderTravels.order, orders)
                .where(
                        orders.orderState.ne(1)
                                .and(orders.orderDt.goe(firstDayOfMonth))
                                .and(orders.orderDt.lt(firstDayOfNextMonth))
                )
                .fetchOne();

        Long totalAmt = (productAmt != null ? productAmt : 0L) + (travelAmt != null ? travelAmt : 0L);

        return new DashboardMonthlyTxDto(totalTx, cancelTx, completeTx, totalAmt);
    }

    /**
     * 설명 : 현재 상품 현황
     * @return DashboardMonthlyTxDto
     */
    public DashboardProductStatsDto getDashboardProductStatsDto() {

        QProduct products = QProduct.product;
        QTravel travels = QTravel.travel;

        // 총 상품, 물품 수(travels + products)
        Long totalTravel = query
                .select(travels.count())
                .from(travels)
                .fetchOne();

        Long totalProduct = query
                .select(products.count())
                .from(products)
                .fetchOne();

        Long totalTravelProducts = (totalTravel != null ? totalTravel : 0L) + (totalProduct != null ? totalProduct : 0L);

        // 품절 상품, 물품 수(travel_sold = true인 travels + product_sold = true인 products)
        Long soldOutTravel = query
                .select(travels.count())
                .from(travels)
                .where(travels.travelSold.eq(true))
                .fetchOne();

        Long soldOutProduct = query
                .select(products.count())
                .from(products)
                .where(products.productSold.eq(true))
                .fetchOne();

        Long soldOutTravelProducts = (soldOutTravel != null ? soldOutTravel : 0L) + (soldOutProduct != null ? soldOutProduct : 0L);

        return new DashboardProductStatsDto(totalTravelProducts, soldOutTravelProducts);
    }

    /**
     * 설명 : 거래 카테고리 통계(물품)
     * @return List<DashboardCategoryStatsDto>
     */
    public List<DashboardCategoryStatsDto> getDashboardCategoryStatsDto() {

        QOrders orders = QOrders.orders;
        QProduct products = QProduct.product;
        QOrderProduct orderProducts = QOrderProduct.orderProduct;

        //모든 제품별 주문 수량 합계 조회 (주문취소 제외, 주문 없으면 0 포함)
        return query
                .select(Projections.constructor(DashboardCategoryStatsDto.class,
                        products.productName,
                        orderProducts.orderProductAmount.sum().longValue().coalesce(0L)
                ))
                .from(products)
                .leftJoin(orderProducts)
                .on(orderProducts.product.eq(products))
                .leftJoin(orderProducts.order, orders)
                .on(orders.orderState.ne(1))
                .groupBy(products.productName)
                .fetch();
    }

    /**
     * 설명 : 이번 주 거래 금액 통계
     * @return DashboardWeeklySalesAmtDto
     */
    public List<DashboardWeeklySalesAmtDto> getDashboardWeeklySalesAmtDto() {
        QOrders orders = QOrders.orders;
        QProduct products = QProduct.product;
        QTravel travels = QTravel.travel;
        QOrderProduct orderProducts = QOrderProduct.orderProduct;
        QOrderTravel orderTravels = QOrderTravel.orderTravel;

        // 오늘 날짜 (예: 2025-06-13) -> startDt : 6일 전(2025-06-07), endDt : 오늘(2025-06-13)
        LocalDate today = LocalDate.now();
        LocalDate startDt = today.minusDays(6);
        LocalDate endDt = today;

        // 여행상품, 물품 기준 일별 총 금액
        List<Tuple> productStats = query
                .select(orders.orderDt, orderProducts.orderProductAmount.multiply(products.productPrice).sum().longValue())
                .from(orderProducts)
                .join(orderProducts.order, orders)
                .join(orderProducts.product, products)
                .where(orders.orderDt.between(startDt, endDt).and(orders.orderState.ne(1)))
                .groupBy(orders.orderDt)
                .fetch();

        List<Tuple> travelStats = query
                .select(orders.orderDt, orderTravels.orderTravelAmount.multiply(travels.travelPrice).sum().longValue())
                .from(orderTravels)
                .join(orderTravels.order, orders)
                .join(orderTravels.travel, travels)
                .where(orders.orderDt.between(startDt, endDt).and(orders.orderState.ne(1)))
                .groupBy(orders.orderDt)
                .fetch();

        // 날짜별로 금액을 합쳐서 맵으로 구성
        Map<LocalDate, Long> dailyTotalMap = new HashMap<>();

        for (Tuple t : productStats) {
            LocalDate date = t.get(0, LocalDate.class);
            Long amount = t.get(1, Long.class);
            dailyTotalMap.put(date, amount);
        }

        for (Tuple t : travelStats) {
            LocalDate date = t.get(0, LocalDate.class);
            Long amount = Optional.ofNullable(t.get(1, Long.class)).orElse(0L);
            if (dailyTotalMap.containsKey(date)) {
                dailyTotalMap.put(date, dailyTotalMap.get(date) + amount);
            } else {
                dailyTotalMap.put(date, amount);
            }
        }

        // 일자별 데이터 생성 (값 없으면 0 처리)
        List<DashboardWeeklySalesAmtDto> result = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            LocalDate date = startDt.plusDays(i);
            result.add(new DashboardWeeklySalesAmtDto(date, dailyTotalMap.getOrDefault(date, 0L)));
        }

        return result;
    }
}
