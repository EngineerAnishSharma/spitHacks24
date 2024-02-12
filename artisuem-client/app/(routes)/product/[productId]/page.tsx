"use client"
import Gallery from "@/components/gallery";
import ProductList from "@/components/ui/product-list";
import Container from "@/components/ui/container";
import Currency from "@/lib/currencyconv";
import getProduct from "@/data-fetchers/get-product";
import getProducts from "@/data-fetchers/get-products";
import { ShoppingCart } from "lucide-react";
import React, { useEffect } from "react";
import getComments from "@/data-fetchers/get-comments";
import CartButton from "./components.tsx/CartButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import sendComment from "@/data-fetchers/set-comments";
import { useAuth } from "@clerk/nextjs";
import sendClicks from "@/data-fetchers/set-clicks";
import { toast } from "sonner";
export const revalidate = 0;
const ProductIdPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = React.useState<Products|null>(null);
  const [Products, setProducts] = React.useState<any[]>([]);
  const [reviews, setReviews] = React.useState<any[]>([])
  const [comment, setComment] = React.useState<string>("")
  const {userId} = useAuth()
  const sendClick = async () => {
    sendClicks({id:params.productId, userId:userId?userId:""})
  }
  const handleSubmit = async() => {
    if(comment.length<1){
      setComment("")
      return
    }
    const res = await sendComment(params.productId, comment, userId?userId:"")
    setReviews([...reviews,res])
    setComment("")
  }
  
const addPop = async(product: any) => {
  console.log(product)
  // if(product?.Image[0].url===undefined) return
  const oimg = await fetch(product?.Image[0].url)
  const i =await oimg.blob()
  const form = new FormData()
  form.append("image",i,"image.jpg")
  console.log(form)
  const URL = process.env.NEXT_PUBLIC_FLASK_URL
  const res = await fetch(`${URL}/artistfetch`, {
    method: "POST",
    redirect: 'follow',
    body: form
  })
  const data = await res.json()
  
  if(data.result){
    toast(data.result)
  }
}
  const getData = async () => {
  const product: Products = await getProduct(params.productId);
  setProduct(product)
  await addPop(product)
  const relatedItems = await getProducts({
    CategoriesId: product.categories?.id,
  });
  setProducts(relatedItems)
  const data = await getComments(params.productId);
  setReviews(data)
}


let ctr=0
useEffect(() => {
  getData()
  if(ctr===0){
    sendClick()
    ctr=1
  }
}, [])

  return (
    <>
      {product?<Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8 ">
          <div className="grid  md:grid-cols-2 lg:items-start px-10 py-5 md:py-8 lg:py-10  ">
            <div className="">
              <Gallery Images={product.Image} />
            </div>
            <div>
              <h2 className="font-semibold text-2xl  ">{product.name}</h2>
              <h3 className=" text-lg  ">
                <Currency value={product.price} />
              </h3>
              <hr className="my-2" />
              <div className="flex items-center gap-x-4">
                <h3>Size:</h3>
                <p className="font-medium">{product?.size?.name}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <h3>Color:</h3>
                <div
                  className="border  rounded-full h-5 w-5"
                  style={{ backgroundImage: product.color.value }}
                ></div>
              </div>
              <CartButton product={product}/>
              <div className=" flex w-full h-[50vh] my-6 p-5 rounded-lg bg-primary-content justify-start items-center flex-col gap-4">
                <div className=" flex flex-row w-full gap-3 ">
                <Input value={comment} onChange={(e)=>{setComment(e.target.value)}} className=" w-full" placeholder="Write a comment" />
                <Button onClick={()=>{handleSubmit()}}>Continue</Button>
                </div>
                {reviews.map((item) => 
                (<div className=" flex w-full text-primary-content bg-secondary rounded-lg p-3 flex-col gap-2 justify-center items-start">
                  <h3>User{parseInt(10000*Math.random())}</h3>
                  <hr className=" w-full flex" />
                  <p>{item.comment}</p>
                </div>)
                )}
              </div>
            </div>
          </div>
          <hr className="my-10" />
          <div className="">
            <ProductList title="Related items" items={Products} />
          </div>
        </div>
      </Container>:<></>}

    </>
  );
};

export default ProductIdPage;
