"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useRef, useState } from "react";

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  // Links have an href; toggles have onClick and render as a <button>.
  href?: string;
  onClick?: () => void;
  pressed?: boolean;
  // Opens in a new tab with a plain <a> instead of client-side navigation.
  external?: boolean;
  active?: boolean;
};

// "top" flips growth, tooltips and the mobile menu so nothing leaves the screen.
type DockPosition = "top" | "bottom";

function DockLink({
  item,
  className,
  children,
}: {
  item: DockItem;
  className?: string;
  children: React.ReactNode;
}) {
  const shared = {
    className,
    "aria-label": item.title,
    "aria-current": item.active ? ("page" as const) : undefined,
  };
  if (item.onClick || !item.href) {
    return (
      <button type="button" onClick={item.onClick} aria-pressed={item.pressed} {...shared}>
        {children}
      </button>
    );
  }
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" {...shared}>
      {children}
    </a>
  ) : (
    <Link href={item.href} {...shared}>
      {children}
    </Link>
  );
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  position = "bottom",
  mobilePosition = position,
  menuLabel = "Menu",
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  position?: DockPosition;
  mobilePosition?: DockPosition;
  menuLabel?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} position={position} />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        position={mobilePosition}
        menuLabel={menuLabel}
      />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  position,
  menuLabel,
}: {
  items: DockItem[];
  className?: string;
  position: DockPosition;
  menuLabel: string;
}) => {
  const [open, setOpen] = useState(false);
  const fromTop = position === "top";
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            id="floating-dock-menu"
            className={cn(
              "absolute inset-x-0 flex flex-col gap-2",
              fromTop ? "top-full mt-2" : "bottom-full mb-2",
            )}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: fromTop ? -10 : 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: fromTop ? -10 : 10,
                  transition: {
                    delay: (fromTop ? items.length - 1 - idx : idx) * 0.05,
                  },
                }}
                transition={{ delay: (fromTop ? idx : items.length - 1 - idx) * 0.05 }}
                // The dock lives in the layout and survives navigation, so close
                // the menu when a link is chosen. Toggles leave it open.
                onClick={item.href ? () => setOpen(false) : undefined}
              >
                <DockLink
                  item={item}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </DockLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls="floating-dock-menu"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse
          className={cn("h-5 w-5 text-neutral-500 dark:text-neutral-400", fromTop && "rotate-180")}
        />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  position,
}: {
  items: DockItem[];
  className?: string;
  position: DockPosition;
}) => {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();

  // While a page transition runs the dock is a snapshot and gets no mouse
  // events, so a mouseleave during it is lost and the icons stay magnified.
  // Start each page from rest; the next mouse move re-magnifies if needed.
  useEffect(() => {
    mouseX.set(Infinity);
  }, [pathname, mouseX]);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
        position === "top" && "items-start pt-3 pb-0",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          item={item}
          position={position}
          pathname={pathname}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  item,
  position,
  pathname,
}: {
  mouseX: MotionValue;
  item: DockItem;
  position: DockPosition;
  pathname: string;
}) {
  const { title, icon } = item;
  const ref = useRef<HTMLDivElement>(null);
  const fromTop = position === "top";

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Hover is remembered per page, so navigating clears a tooltip whose
  // mouseleave was lost during the page transition.
  const [hoveredOn, setHoveredOn] = useState<string | null>(null);
  const hovered = hoveredOn === pathname;

  return (
    <DockLink item={item}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHoveredOn(pathname)}
        onMouseLeave={() => setHoveredOn(null)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: fromTop ? -10 : 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: fromTop ? -2 : 2, x: "-50%" }}
              className={cn(
                "absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white",
                fromTop && "top-auto -bottom-8",
              )}
              aria-hidden="true"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </DockLink>
  );
}
