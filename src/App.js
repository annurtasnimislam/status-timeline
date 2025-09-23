import { useState } from 'react';
import './App.css';

function App() {
  const [activeStatus, setActiveStatus] = useState('delivered');

  return (
    <div className="h-[40vh] flex items-center justify-center">
      <div className="border border-gray-200 p-12">
        <p className="mb-8 font-semibold">Status Timeline</p>
        <div className="relative mt-4 flex flex-col lg:flex-row">
          {[
            {
              status: 'Pending',
              desc: 'Your order has been received',
              step: 'pending',
            },
            {
              status: 'Confirmed',
              desc: 'Your order has been confirmed',
              step: 'confirmed',
            },
            {
              status: 'Processing',
              desc: 'Your order is being processed',
              step: 'processing',
            },
            {
              status: 'Ready for Shipment',
              desc: 'Your order is ready for shipment',
              step: 'ready_for_shipment',
            },
            {
              status: 'Hand Over to Rider',
              desc: 'Your order has been handed over to the rider',
              step: 'hand_over_to_rider',
            },
            {
              status: 'Rider on the Way',
              desc: 'The rider is on the way to deliver your order',
              step: 'rider_on_the_way',
            },
            {
              status: 'Delivered',
              desc: 'Your order is delivered successfully',
              step: 'delivered',
            },
            ...(activeStatus === 'cancelled'
              ? [
                  {
                    status: 'Cancelled',
                    desc: 'Your order has been cancelled',
                    step: 'cancelled',
                  },
                ]
              : []),
            ...(activeStatus === 'failed'
              ? [
                  {
                    status: 'Failed',
                    desc: 'Your order could not be completed',
                    step: 'failed',
                  },
                ]
              : []),
            ...(activeStatus === 'on_hold'
              ? [
                  {
                    status: 'On Hold',
                    desc: 'Your order is currently on hold',
                    step: 'on_hold',
                  },
                ]
              : []),
            ...(activeStatus === 'customer_was_not_available'
              ? [
                  {
                    status: 'Customer Unavailable',
                    desc: 'Delivery failed because the customer was not available',
                    step: 'customer_was_not_available',
                  },
                ]
              : []),
          ].map((item, idx, arr) => {
            let circleColor = 'bg-gray-300';
            let lineColor = idx < arr.length - 1 ? 'bg-gray-300' : 'bg-transparent';

            if (activeStatus === 'on_hold') {
              circleColor = 'bg-yellow-300';
              lineColor = idx < arr.length - 1 ? 'bg-yellow-500' : 'bg-transparent';
            } else if (
              ['cancelled', 'failed', 'customer_was_not_available'].includes(activeStatus)
            ) {
              circleColor = 'bg-red-500';
              lineColor = idx < arr.length - 1 ? 'bg-red-500' : 'bg-transparent';
            } else {
              const stepColors = {
                pending: 'bg-purple-500',
                confirmed: 'bg-blue-500',
                processing: 'bg-green-500',
                ready_for_shipment: 'bg-pink-400',
                hand_over_to_rider: 'bg-teal-500',
                rider_on_the_way: 'bg-yellow-500',
                delivered: 'bg-orange-500',
              };

              const stepOrder = [
                'pending',
                'confirmed',
                'processing',
                'ready_for_shipment',
                'hand_over_to_rider',
                'rider_on_the_way',
                'delivered',
              ];
              const activeIndex = stepOrder.indexOf(activeStatus);
              const currentIndex = stepOrder.indexOf(item.step);

              if (currentIndex <= activeIndex) {
                circleColor = stepColors[item.step];
              }

              if (currentIndex < activeIndex) {
                lineColor = stepColors[item.step];
              }
            }

            return (
              <div key={idx} className="flex flex-row lg:flex-col items-center flex-1">
                <p className="text-sm hidden lg:block font-semibold mt-1 mb-4">{item.status}</p>
                <div className="relative flex items-center w-[10%] lg:w-full lg:ml-[90%]">
                  <div
                    className={`absolute top-2 left-2 lg:left-1/2 h-[350%] w-0.5 lg:w-full lg:h-0.5 ${lineColor}`}
                    style={{ transform: 'translateX(-50%)' }}
                  />
                  <div className={`w-4 h-4 rounded-full z-10 ${circleColor}`} />
                </div>
                <div className="flex flex-col items-start lg:items-center mt-[-10px] lg:mt-2">
                  <p className="text-sm block lg:hidden font-semibold mt-6">{item.status}</p>
                  <p className="text-xs text-gray-500 text-center max-w-xs">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
