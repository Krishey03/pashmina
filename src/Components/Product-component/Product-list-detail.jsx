import { Download } from "lucide-react";
import { Button } from "../ui/button"

function ProductListDetail({ product }) {
  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Product Name */}
      <h1 className="text-[32px] font-normal font-manrope">
        {product.name || "Classic Handwoven Pashmina"}
      </h1>

      {/* Price + Note */}
      <div className="flex items-baseline mt-[21px]">
        <p className="text-[24px] font-bold font-manrope">${product.price}</p>
        <span className="ml-2 text-[12px] font-extralight font-manrope">
          *per piece, depending on the order quantity*
        </span>
      </div>

      {/* Attributes */}
      <div className="grid grid-cols-[180px_1fr] gap-y-[24px] mt-[21px]">
        <span className="text-[16px] font-bold font-manrope">Fiber Composition</span>
        <span className="text-[16px] font-extralight font-manrope">{product.fiberComposition || "80% Cashmere - 20% Silk"}</span>

        <span className="text-[16px] font-bold font-manrope">Weave Type</span>
        <span className="text-[16px] font-extralight font-manrope">{product.weaveType || "Plain Weave"}</span>

        <span className="text-[16px] font-bold font-manrope">Dimension</span>
        <span className="text-[16px] font-extralight font-manrope">
          {product.dimention1} x {product.dimention2} cm
        </span>

        <span className="text-[16px] font-bold font-manrope">Design</span>
        <span className="text-[16px] font-extralight font-manrope">{product.design || "Solid"}</span>

        <span className="text-[16px] font-bold font-manrope">Fringe Style</span>
        <span className="text-[16px] font-extralight font-manrope">{product.fringeStyle || "Tasselled"}</span>

        <span className="text-[16px] font-bold font-manrope">Origin</span>
        <span className="text-[16px] font-extralight font-manrope">{product.origin || "Kathmandu, Nepal"}</span>

        <span className="text-[16px] font-bold font-manrope">Category</span>
        <span className="text-[16px] font-extralight font-manrope">{product.category || "Shawl"}</span>
      </div>

      {/* Circles + Button */}
      <div className="flex items-center gap-[12px] mt-[21px]">
        <div className="flex gap-[4px]">
          <div className="w-[44px] h-[44px] rounded-full bg-red-500"></div>
          <div className="w-[44px] h-[44px] rounded-full bg-blue-500"></div>
          <div className="w-[44px] h-[44px] rounded-full bg-green-500"></div>
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2 h-[44px] bg-[#AEAEAE]"
        >
          Our Palette <Download size={18} />
        </Button>
      </div>
    </div>
  );
}

export default ProductListDetail;