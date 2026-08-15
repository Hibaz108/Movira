const Title = ({ title }: { title: string }) => {
  return (
    <div className="mb-3">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground font-heading">
        {title}
      </h2>
      <div className="w-14 h-1.5 bg-primary rounded-full"></div>
    </div>
  );
};

export default Title;
