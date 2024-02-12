# import os
# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import PIL
# from fastapi.responses import JSONResponse
# from fastapi.encoders import jsonable_encoder

# app = FastAPI()
# origins = ["*"]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get('/')
# async def start():
#     return "Hello"

# @app.post('/ingredientsfetch')
# async def ingredientsfetch(image: UploadFile = File(...)):
#     try:
#         contents = await image.read()
#         with open("temp_image.jpg", "wb") as f:
#             f.write(contents)

#         img = PIL.Image.open('temp_image.jpg')
#         prompt = "Extract all the information of person from the following text without any special characters or numbers just , as the separator between ingredients"
#         result = model.generate_content([prompt,img],stream=True)
#         result.resolve()
#         os.remove("temp_image.jpg")
        
#         return JSONResponse(content=jsonable_encoder({'result': result.text}))
#     except Exception as e:
#         print(str(e))
#         return JSONResponse(content=jsonable_encoder({'error': str(e)}), status_code=500)

# @app.post('/geminiocr')
# async def geminiocr(image: UploadFile = File(...)):
#     try:
#         contents = await image.read()
#         with open("temp_image.jpg", "wb") as f:
#             f.write(contents)

#         img = PIL.Image.open('temp_image.jpg')
#         result = model.generate_content([img, "Extract all the information of artisanal and handcrafted goods from the image without any special characters or numbers just , as the separator between goods"], stream=True)
#         result.resolve()
#         os.remove("temp_image.jpg")
        
#         return JSONResponse(content=jsonable_encoder({'result': result.text}))
#     except Exception as e:
#         return JSONResponse(content=jsonable_encoder({'error': str(e)}), status_code=500)
