"use client";
import { cn } from "@/lib/utils";
import { Diamond, Layers2, LayoutGrid, List } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import React from "react";

type Views = "List" | "Grid" | "Stacked";

type ViewItem = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  view: Views;
};

type Item = {
  name: string;
  image: string;
  angle?: number;
  rate: number;
  position: number;
};

const views: ViewItem[] = [
  {
    name: "List view",
    icon: List,
    view: "List",
  },
  {
    name: "Card view",
    icon: LayoutGrid,
    view: "Grid",
  },
  {
    name: "Pack view",
    icon: Layers2,
    view: "Stacked",
  },
];

const TRANSITION = {
  type: "spring",
  stiffness: 350,
  damping: 35,
  mass: 0.5,
  duration: 0.4,
};

const ITEM_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 0.4,
  duration: 0.35,
};

const items: Item[] = [
  {
    name: "Skilled Fingers Series",
    image: "/skilled-fingers-series.svg",
    angle: -10,
    rate: 0.855,
    position: 209,
  },
  {
    name: "Vibrant Vibes Series",
    image: "/vibrant-vibes-series.svg",
    angle: 15,
    rate: 0.209,
    position: 808,
  },
];

const SharedLayoutTabs = () => {
  const [view, setView] = React.useState<Views>("List");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleClick = (newView: Views, index: number) => {
    setView(newView);
    setActiveIndex(index);
  };

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="center full">
        <div className="max-w-md w-full space-y-4">
          <div className="h-14 border-b flex gap-2 relative">
            <motion.div
              className="absolute h-8 bg-[#00b3ff] rounded-full"
              initial={{ width: "110px", left: 0 }}
              animate={{
                width: views[activeIndex].name.length > 9 ? "120px" : "110px",
                left: `${activeIndex * 33.33}%`,
              }}
              transition={TRANSITION}
            />

            {views.map((item, index) => (
              <button
                key={item.name}
                className={cn(
                  "flex items-center gap-1 h-8 cursor-pointer px-[10px] rounded-full w-full text-sm font-normal outline-none z-10 relative",
                  item.view === view ? "text-white" : "text-muted-foreground"
                )}
                onClick={() => handleClick(item.view, index)}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{
                    scale: item.view === view ? [1, 1.125, 1] : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    times: [0, 0.5, 1],
                  }}
                >
                  <item.icon className="size-4" />
                </motion.div>
                <span className="text-nowrap">{item.name}</span>
              </button>
            ))}
          </div>

          <div className="min-h-80 relative">
            <AnimatePresence mode="popLayout">
              {view === "List" && <ListView view={view} />}
              {view === "Grid" && <GridView view={view} />}
              {view === "Stacked" && <StackedView view={view} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

const ListView = ({ view }: { view: Views }) => {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {items.map((item, idx) => (
        <ItemView
          key={idx}
          item={item}
          idx={idx}
          view={view}
          className="flex items-center gap-2 flex-row"
        />
      ))}
    </motion.div>
  );
};

const GridView = ({ view }: { view: Views }) => {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {items.map((item, idx) => (
        <ItemView key={idx} item={item} idx={idx} view={view} />
      ))}
    </motion.div>
  );
};

const StackedView = ({ view }: { view: Views }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative flex w-full items-center justify-center h-32">
        {items.map((item, idx) => (
          <ItemView
            key={idx}
            item={item}
            idx={idx}
            view={view}
            className="absolute"
          />
        ))}
      </div>
      <div className="text-center mt-2">
        <AnimatePresence>
          {view === "Stacked" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={ITEM_TRANSITION}
              className="flex items-center gap-2 justify-center flex-col text-sm"
            >
              <span>{items.length} Collectibles</span>
              <span>
                {items.reduce((acc, item) => acc + item.rate, 0)}{" "}
                <span className="text-muted-foreground">ETH</span>
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ItemView = ({
  item,
  idx,
  view,
  className,
}: {
  item: Item;
  idx: number;
  view: Views;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn("flex flex-col gap-2", className)}
      layoutId={`view-item-container-${idx}`}
      style={{
        rotate: view === "Stacked" ? item.angle : 0,
        zIndex: view === "Stacked" ? items.length - idx : 0,
      }}
      transition={ITEM_TRANSITION}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
    >
      <motion.img
        layoutId={`view-item-image-${idx}`}
        src={item.image}
        alt={item.name}
        className={cn(
          view === "Grid"
            ? "size-40 rounded-xl"
            : view === "List"
            ? "size-14 rounded-md"
            : "size-20 rounded-xl",
          "object-cover"
        )}
        transition={ITEM_TRANSITION}
      />
      <AnimatePresence>
        {view !== "Stacked" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={ITEM_TRANSITION}
            className={cn(
              "flex items-center gap-2",
              view === "List" && "flex-1"
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-1 text-sm font-medium",
                view === "List" && "flex-1"
              )}
            >
              <motion.h3
                layoutId={`view-item-title-${idx}`}
                className=""
                transition={ITEM_TRANSITION}
              >
                {item.name}
              </motion.h3>
              <motion.p
                layoutId={`view-item-description-${idx}`}
                className="text-xs flex items-center justify-between"
                transition={ITEM_TRANSITION}
              >
                <span className="flex items-center gap-1">
                  <span>{item.rate}</span>{" "}
                  <span className="text-muted-foreground">ETH</span>
                </span>
                {view === "Grid" && (
                  <motion.span
                    layoutId={`view-item-position-${idx}`}
                    className="flex items-center gap-1"
                    transition={ITEM_TRANSITION}
                  >
                    <Diamond className="fill-[#fee9ad] text-[#ffe395] size-4" />
                    <span className="text-muted-foreground">
                      #{item.position}
                    </span>
                  </motion.span>
                )}
              </motion.p>
            </div>
            {view === "List" && (
              <motion.span
                layoutId={`view-item-position-${idx}`}
                className="flex items-center gap-1"
                transition={ITEM_TRANSITION}
              >
                <Diamond className="fill-[#fee9ad] text-[#ffe395] size-4" />
                <span className="text-muted-foreground">#{item.position}</span>
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SharedLayoutTabs;
