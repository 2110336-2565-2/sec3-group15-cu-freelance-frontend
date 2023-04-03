import tw from "twin.macro";
import { forwardRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import OrderCard from "../share/OrderCard";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const OrderCarousel = forwardRef(
  (
    {
      orders,
      isLoading,
      handleInfiniteScroll,
      selectOrder,
      userType,
      openConfirmModal,
      onClickCardHandler,
    },
    ref
  ) => {
    return (
      <div tw="flex justify-center w-full pl-2 dt:pl-0">
        {!orders && !isLoading && <div>no result </div>}
        {orders && (
          <Swiper
            ref={ref}
            tw="py-5 px-0.5 w-full"
            // onReachEnd={(swiper) => {
            //   console.log(swiper);
            //
            // }}
            onSlideChange={(swiper) => {
              if (swiper.activeIndex === orders.length - 5) {
                handleInfiniteScroll();
              }
            }}
            grabCursor={true}
            slidesPerView="auto"
          >
            {orders.map((order) => (
              <SwiperSlide key={order.id} style={{ width: "260px" }}>
                <OrderCard
                  header={order.title}
                  description={order.description}
                  customer={order.customer_name}
                  freelance={
                    selectOrder !== "template" &&
                    (selectOrder !== "request" || userType !== 1)
                      ? order.freelance_name
                      : null
                  }
                  due_date={order.due_date}
                  duration={order.duration}
                  price={order.price}
                  hasStatus={selectOrder !== "template"}
                  status={order.status}
                  orderType={selectOrder}
                  userType={userType}
                  onClick={onClickCardHandler.bind(null, order)}
                  order={order}
                  openConfirmModal={openConfirmModal}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    );
  }
);

export default OrderCarousel;
