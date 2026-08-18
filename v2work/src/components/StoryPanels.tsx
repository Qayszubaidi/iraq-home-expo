import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const panels = [
  {
    href: "/sectors",
    image: "/assets/furniture.webp",
    alt: "Products and suppliers",
    tag: "Discover",
    title: "Discover Products & Suppliers",
    copy: "Browse furniture, interiors, kitchen, lighting and home systems from international exhibitors.",
    cta: "Explore sectors",
  },
  {
    href: "/visit",
    image: "/assets/industry-professionals.webp",
    alt: "Industry professionals networking",
    tag: "Connect",
    title: "Meet Buyers & Industry Professionals",
    copy: "Connect with architects, developers, distributors and decision-makers across Iraq's home market.",
    cta: "Plan your visit",
  },
  {
    href: "/exhibit",
    image: "/assets/build-partnerships.webp",
    alt: "Business partnership",
    tag: "Partner",
    title: "Build Partnerships in Iraq",
    copy: "Present your company to professionals actively sourcing products and solutions in Baghdad.",
    cta: "Exhibit with us",
  },
] as const;

export default function StoryPanels() {
  return (
    <section className="storyPanels">
      <Reveal className="storyPanelsIntro">
        <span className="eyebrow light">Why attend</span>
        <h2 className="displayHeading">Products. People. Business.</h2>
      </Reveal>
      <div className="storyPanelsStack">
        {panels.map((panel, i) => (
          <Reveal key={panel.href} className={`storyPanel storyPanel--${i + 1}`}>
            <Link href={panel.href} className="storyPanelLink">
              <Image fill src={panel.image} alt={panel.alt} sizes="(max-width:768px) 100vw, 70vw" />
              <div className="storyPanelShade" />
              <div className="storyPanelContent">
                <span className="storyPanelTag">{panel.tag}</span>
                <h3>{panel.title}</h3>
                <p>{panel.copy}</p>
                <span className="storyPanelCta">
                  {panel.cta} <span className="goldArrow">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
