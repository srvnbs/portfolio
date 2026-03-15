function CarromBoard() {
  return (
    <div className="absolute bg-[#eeeeee] left-1/2 rounded-[40px] size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="CarromBoard">
      <div aria-hidden="true" className="absolute border-[5px] border-solid border-white inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

export default function WhiteCoin() {
  return (
    <div className="bg-[#eeeeee] relative rounded-[40px] size-full" data-name="White coin">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <CarromBoard />
      </div>
      <div aria-hidden="true" className="absolute border-[5px] border-solid border-white inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}
