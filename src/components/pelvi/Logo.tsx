/**
 * Logo oficial da soupelvi (ícone + nome), servido de /public/brand.
 * - horizontal + roxo: fundos claros (header)
 * - horizontal + branco: fundos escuros (rodapé)
 * - vertical + branco: destaque em fundo escuro (hero)
 * Os originais em alta resolução ficam em /design/logos (fora do git).
 */
const VARIANTS = {
  "horizontal-roxo": { src: "/brand/logo-horizontal-roxo.png", width: 424, height: 112 },
  "horizontal-branco": { src: "/brand/logo-horizontal-branco.png", width: 424, height: 112 },
  "vertical-branco": { src: "/brand/logo-vertical-branco.png", width: 427, height: 300 },
} as const;

export function Logo({
  variant,
  className = "",
  priority = false,
}: {
  variant: keyof typeof VARIANTS;
  className?: string;
  priority?: boolean;
}) {
  const v = VARIANTS[variant];
  return (
    <img
      src={v.src}
      width={v.width}
      height={v.height}
      alt="soupelvi"
      className={`w-auto select-none ${className}`}
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
