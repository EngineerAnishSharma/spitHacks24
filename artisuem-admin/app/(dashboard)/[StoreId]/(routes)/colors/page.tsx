"use client"
import React, { useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { Textarea } from "@/components/ui/textarea";

export default function NewProject() {
	const [img, setImg] = useState<any>("")
	const [ogimg, setOgImg] = useState<any>("")
	const [loading,setLoading] = useState<any>(false)
	// const navRouter = useRouter()
    const [image, setImage] = useState<any>(null);
    const dropref = useRef(null);
    
	function downloadImage() {
		try {
			navigator.clipboard.writeText(img);
			toast("Description copied successfully")
		} catch (error) {
			toast("An error occured")
		}
	}

	const handleDiscard = () => {
		setImg(null)
	}
    const onDrop = (acceptedFiles:any) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        console.log(reader.result)
        setImage(reader.result);
        setOgImg(reader.result)
      };
  
      reader.readAsDataURL(file);
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    function base64toBlob({base64String, mimeType = 'application/octet-stream'}: {base64String: string, mimeType?: string}) {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
      
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
      
        const byteArray = new Uint8Array(byteNumbers);
      
        return new Blob([byteArray], { type: mimeType });
      }

	const handleSubmit = async(e: any) => {
		setLoading(true)
		e.preventDefault()

		const formData = new FormData()
        const oimg = await fetch(ogimg)
        const i =await oimg.blob()
        formData.append("image",i,"image.png")
		console.log(formData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/artistocr`, {
			method: "POST",
			redirect: 'follow',
			body: formData

		})
		const data = await res.json()
		console.log(data)

		if(data.result){
			setImg(data.result)
		}else{
			toast("An error occured")

		}
		setLoading(false)
	}

    const dropzoneStyle = {
        border: '2px dashed #cccccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        marginTop: '20px',
      };
	return (
		<div className={"flex flex-grow h-[90vh] flex-col justify-start  items-center"}>
			<form onSubmit={(e)=>{handleSubmit(e)}} className={"flex-grow flex flex-col gap-3 w-10/12 p-4"}>
				<div className={"flex flex-col gap-4"}>
					<div className={"flex flex-col gap-4 items-start pt-10"}>
						
						<h2 className={"text-3xl font-bold"}>
									{`Just click a photo of your art piece!`}
								</h2>
					</div>
					<hr/>
					<div className={"flex flex-col gap-2 flex-grow"}>
						<div className={"flex flex-row gap-4 items-center flex-grow"}>
                        <div className=" w-full flex flex-col gap-6">
      {!image?<div ref={dropref} {...getRootProps()} style={dropzoneStyle} className=' w-full h-[40vh] flex flex-col justify-start items-center'>
        <input id="drop" {...getInputProps()} />
        {isDragActive ? <p>Drop the image here...</p> : <p>Drag and drop an image here, or click to select an image</p>}
      </div>:
      <>
    </>}
      {image && (
        <div className="flex flex-row w-full ">
            <div className=" w-full flex flex-col justify-start items-center gap-4">
        <img
          src={ogimg}
          className=" w-fit h-full max-h-[30vh] max-w-[30vw]"
          
          style={{ border: '1px solid #000', marginTop: '10px' }}
        />
      </div>
        </div>
      )}
      <div className=" w-full flex flex-row items-center justify-between gap-4">
      <Button type="button" onClick={()=>{dropref?dropref.current.click():""}} variant="secondary" className=" w-full">
                      {"Change Image"}
                  </Button>
      <Button type="submit" className=" w-full">
                      {img?"Regenerate Caption":"Generate Caption"}
                  </Button>
      </div>
      
    </div>

						</div>
						
					</div>
					
				</div>
			</form>
					{!loading?
					img ?
					<div className={"flex flex-col gap-4 items-center justify-center w-10/12 px-4 py-8 flex-grow"}>
						<Textarea rows={8}
								  value={img} onChange={(e) => setImg(e.target.value)}
								  placeholder={"Your Description"}
						/>
						<div className=" flex flex-row justify-between w-full items-center">
							<Button onClick={() => {
								handleDiscard()
							}} variant="secondary" className=" w-fit">Discard</Button>
							{/* <a className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90" href={img} download="Varad's Resume">Download</a> */}
							<Button onClick={() => {
								downloadImage()
							}}>Copy</Button>
						</div>
					</div> :
					<></> :
						<></>}
		</div>
	)
}