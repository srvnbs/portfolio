function CarromBoard() {
  return (
    <div className="absolute bg-[#545454] left-1/2 rounded-[40px] size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="CarromBoard">
      <div aria-hidden="true" className="absolute border-[#151515] border-[5px] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

export default function BlackCoin() {
  return (
    <div className="bg-[#545454] relative rounded-[40px] size-full" data-name="Black coin">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <CarromBoard />
      </div>
      <div aria-hidden="true" className="absolute border-[#151515] border-[5px] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}
