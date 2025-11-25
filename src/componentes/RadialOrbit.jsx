import * as React from 'react';
import { LayoutGroup, motion, useAnimate, delay } from 'motion/react';

const transition = {
  delay: 0,
  stiffness: 300,
  damping: 35,
  type: 'spring',
  restSpeed: 0.01,
  restDelta: 0.01,
};

const spinConfig = {
  duration: 30,
  ease: 'linear',
  repeat: Infinity,
};

const qsa = (root, sel) => Array.from(root.querySelectorAll(sel));

const angleOf = (el) => Number(el.dataset.angle || 0);

const armOfImg = (img) => img.closest('[data-arm]');

export const RadialOrbit = ({
  orbitItems,
  stageSize = 340,
  imageSize = 80,
  centerImage,
}) => {
  const step = 360 / orbitItems.length;
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    // get arm and image elements
    const arms = qsa(root, '[data-arm]');
    const imgs = qsa(root, '[data-arm-image]');
    const stops = [];

    // image lift-in
    delay(() => animate(imgs, { top: 0 }, transition), 250);

    // build sequence for orbit placement
    const orbitPlacementSequence = [
      ...arms.map((el) => [
        el,
        { rotate: angleOf(el) },
        { ...transition, at: 0 },
      ]),
      ...imgs.map((img) => [
        img,
        { rotate: -angleOf(armOfImg(img)), opacity: 1 },
        { ...transition, at: 0 },
      ]),
    ];

    // play placement sequence
    delay(() => animate(orbitPlacementSequence), 700);

    // start continuous spin for arms and images
    delay(() => {
      // arms spin clockwise
      arms.forEach((el) => {
        const angle = angleOf(el);
        const ctrl = animate(el, { rotate: [angle, angle + 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });

      // images counter-spin to stay upright
      imgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const ctrl = animate(
          img,
          { rotate: [-angle, -angle - 360] },
          spinConfig,
        );
        stops.push(() => ctrl.cancel());
      });
    }, 1300);

    return () => stops.forEach((stop) => stop());
  }, []);

  return (
    <LayoutGroup>
      <motion.div
        ref={scope}
        className="relative overflow-visible"
        style={{ width: stageSize, height: stageSize }}
        initial={false}
      >
        {/* Imagen central */}
        {centerImage && (
          <img
            src={centerImage.src}
            alt={centerImage.alt || "Centro"}
            className="absolute left-1/2 top-1/2 rounded-full object-cover"
            style={{
              width: imageSize + 24,
              height: imageSize + 24,
              transform: "translate(-50%, -50%)",
              zIndex: orbitItems.length + 2,
              boxShadow: "0 4px 24px rgba(30,58,138,0.18)",
              border: "4px solid #fff"
            }}
            draggable={false}
          />
        )}
        {orbitItems.map((item, i) => (
          <motion.div
            key={item.id}
            data-arm
            className="will-change-transform absolute inset-0"
            style={{ zIndex: orbitItems.length - i + 1 }}
            data-angle={i * step}
            layoutId={`arm-${item.id}`}
          >
            <motion.img
              data-arm-image
              className="rounded-full object-fill absolute left-1/2 top-1/2"
              style={{
                width: imageSize,
                height: imageSize,
                opacity: i === 0 ? 1 : 0,
                transform: "translate(-50%, -50%)"
              }}
              src={item.src}
              alt={item.name}
              draggable={false}
              layoutId={`arm-img-${item.id}`}
            />
          </motion.div>
        ))}
      </motion.div>
    </LayoutGroup>
  );
};
