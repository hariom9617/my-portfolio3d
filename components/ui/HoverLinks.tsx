const HoverLinks = ({ text, cursor }: { text: string; cursor?: boolean }) => {
  return (
    <div
      className="relative flex overflow-hidden text-nowrap"
      data-cursor={!cursor ? "disable" : undefined}
    >
      <div className="relative transition-transform duration-300 group-hover:-translate-y-full hover:-translate-y-full [&:hover]:text-[var(--accentColor)]">
        {text}
        <div className="absolute top-full left-0 flex">
          {text}
        </div>
      </div>
    </div>
  );
};

export default HoverLinks;