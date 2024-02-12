"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Currency from "../../lib/currencyconv";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import IconButton from "./icon";
import UsePreview from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import sendLike from "@/data-fetchers/set-likes";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect } from "react";
import getLikes from "@/data-fetchers/get-likes";
type ProductCardProps = {
  data: Products;
};
const ProductCard = ({ data }: ProductCardProps) => {
  const router = useRouter();
  const previewState = UsePreview();
  const CartHandler = useCart();
  const {userId} = useAuth()
  const [Liked, setLiked] = React.useState<boolean>(false);
  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  const getLiked = async (productId:string) => {
    const res = await getLikes(productId);
    const arr = res.filter((item) => item.userId === userId);
    setLiked(arr.length>0)
  }
  useEffect(() => {
    getLiked(data.id)
  },[])

  const HandleExpand = (event: React.FormEvent) => {
    event.stopPropagation();
    previewState.onOpen(data);
  };

  const HandleCart = (event: React.FormEvent) => {
    event.stopPropagation();
    CartHandler.addItem(data);
  };

  const HandleLike = async(event: React.FormEvent) => {
    event.stopPropagation();
    if(userId){
      setLiked(!Liked)
    await sendLike({id: data.id,userId:userId});
    }
  };
  return (
    <div
      onClick={handleClick}
      className="group  cursor-pointer shadow-sm  rounded-md border p-3 space-y-4 h-full  sm:w-full  w-[62%] mx-auto "
    >
      <div className="aspect-square rounded-xl  relative">
        <Image
          src={data.Image?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={HandleExpand}
              icon={<Expand size={20} className="text-accent" />}
            />
            <IconButton
              onClick={HandleLike}
              icon={<Heart size={20} className={`text-accent ${Liked?"fill-purple-600":" fill-transparent"}`} />}
            />
            <IconButton
              onClick={HandleCart}
              icon={<ShoppingCart size={20} className="text-accent" />}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500 font-sans">
          {data.categories?.name}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
