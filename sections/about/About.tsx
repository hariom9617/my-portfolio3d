const About = () => {
  const getExperience = () => {
    const start = new Date(2024, 9, 1); // October 1, 2024
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const parts = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);

    return parts.join(" ");
  };

  return (
    <div
      className="about-section flex items-center justify-start place-items-center relative opacity-100 h-auto w-[var(--cWidth)] mx-auto sm:justify-center lg:justify-end lg:max-w-[1920px] lg:h-[var(--vh)]"
      id="about"
    >
      <div
        className="about-me
          py-[50px] pb-0
          w-[calc(100%-15px)]
          max-w-[calc(100%-15px)]
          md:w-[580px]
          md:max-w-[calc(100%-70px)]
          lg:p-0
          lg:w-[55%]
          xl:w-[48%]
        "
        style={{ transform: "translateY(-50%)" }}
      >
        {/* Title — muted teal, tight uppercase tracking, lightweight */}
        <h3
          className="
          title
          text-[13px]
          uppercase
          tracking-[6px]
          font-normal
          mb-6
          text-[var(--accentColor)]
          opacity-80
          lg:text-[14px]
          lg:tracking-[8px]
        "
        >
          About Me
        </h3>

        {/* Paragraph — large, bold, white, generous line-height */}
        <p
          className="
          para
          m-0
          text-[22px]
          font-bold
          leading-[1.25]
          tracking-[0.3px]
          text-white
          lg:text-[1.6vw]
          lg:leading-[1.3]
          xl:text-[1.5vw]
          min-[1950px]:text-[2rem]
          min-[1950px]:leading-[1.3]
        "
        >
          Full Stack Developer with{" "}
          <span className="text-[var(--accentColor)]">{getExperience()}</span>{" "}
          of experience building modern web applications using React, Next.js,
          Angular, Node.js, Java, Python, and MongoDB. I enjoy creating
          real-world products that combine clean UI, scalable backend systems,
          and smooth user experiences, ranging from e-commerce platforms and
          SaaS automation tools to interactive 3D web applications.
        </p>
      </div>
    </div>
  );
};

export default About;
