"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFolders,
  IconHome,
  IconMail,
  IconUser,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { isSoundOn, playSelect, setSoundOn, subscribeSound } from "@/lib/sound";
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const brandIcons: Record<string, typeof IconBrandGithub> = {
  GitHub: IconBrandGithub,
  LinkedIn: IconBrandLinkedin,
};

type SiteDockProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export function SiteDock({ locale, nav }: SiteDockProps) {
  const pathname = usePathname();
  const soundOn = useSyncExternalStore(subscribeSound, isSoundOn, () => true);

  const toggleSound = () => {
    setSoundOn(!soundOn);
    // The global click listener checked before this flip, so confirm "on" here.
    if (!soundOn) playSelect();
  };

  const iconClass = (active = false) =>
    cn("h-full w-full", active ? "text-red-500" : "text-neutral-500 dark:text-neutral-300");

  const pages = [
    { path: "", title: nav.home, Icon: IconHome },
    { path: "/profile", title: nav.profile, Icon: IconUser },
    { path: "/projects", title: nav.projects, Icon: IconFolders },
  ];

  const items: DockItem[] = [
    ...pages.map(({ path, title, Icon }) => {
      const href = `/${locale}${path}`;
      // Home only matches itself; /projects stays active on a project's detail page.
      const active = path ? pathname === href || pathname.startsWith(`${href}/`) : pathname === href;
      return { title, href, active, icon: <Icon className={iconClass(active)} /> };
    }),
    ...profile.socials.map((social) => {
      const Icon = brandIcons[social.label];
      return {
        title: social.label,
        href: social.href,
        external: true,
        icon: <Icon className={iconClass()} />,
      };
    }),
    {
      title: nav.email,
      href: `mailto:${profile.email}`,
      external: true,
      icon: <IconMail className={iconClass()} />,
    },
    {
      title: nav.sound,
      onClick: toggleSound,
      pressed: soundOn,
      icon: soundOn ? <IconVolume className={iconClass()} /> : <IconVolumeOff className={iconClass()} />,
    },
  ];

  return (
    <FloatingDock
      items={items}
      position="top"
      mobilePosition="bottom"
      menuLabel={nav.menu}
      desktopClassName="absolute top-4 left-1/2 z-50 -translate-x-1/2 border border-gray-200 shadow-sm dark:border-white/10"
      mobileClassName="fixed right-4 bottom-4 z-50 rounded-full border border-gray-200 shadow-lg dark:border-white/10"
    />
  );
}
