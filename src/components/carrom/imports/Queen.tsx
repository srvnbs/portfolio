function CarromBoard() {
  return (
    <div className="absolute bg-[#d33a78] left-1/2 rounded-[40px] size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="CarromBoard">
      <div aria-hidden="true" className="absolute border-[#ff639d] border-[5px] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

export default function Queen() {
  return (
    <div className="bg-[#d33a78] relative rounded-[40px] size-full" data-name="Queen">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <CarromBoard />
      </div>
      <div aria-hidden="true" className="absolute border-[#ff639d] border-[5px] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}
