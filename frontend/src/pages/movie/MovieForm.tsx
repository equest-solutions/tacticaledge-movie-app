import { useRef, useState, FormEvent, useEffect, PropsWithChildren } from 'react';
import UploadIcon from '../../components/icon/UploadIcon';
import TextSmall from '../../components/typography/TextSmall';
import TextInput from '../../components/TextInput';
import ButtonOutline from '../../components/button/ButtonOutline';
import Button from '../../components/button/Button';
import { isValid } from '../../helper/formValidator';

interface FormState {
   title: boolean;
   year: boolean;
   image: boolean;
   formValid: boolean;
}

const formErrorInitialState: FormState = {
   title: false,
   year: false,
   image: false,
   formValid: true,
};

interface MovieFormProps {
   onSubmit: Function;
   defaultState?: any;
}

function MovieForm({ onSubmit, defaultState }: PropsWithChildren<MovieFormProps>) {
   const fileInput = useRef(null);
   const [formError, setFormError] = useState(formErrorInitialState);
   const [uploadImage, setUploadImage] = useState({
      src: '',
      blob: '',
   });

   const [isMobileView, setIsMobileView] = useState(false);

   useEffect(() => {
      function checkWindowWidth() {
         if (window.innerWidth < 768) {
            setIsMobileView(true);
         } else setIsMobileView(false);
      }
      checkWindowWidth();
      window.addEventListener('resize', checkWindowWidth);

      return () => {
         window.removeEventListener('resize', checkWindowWidth);
      };
   }, []);

   function fileDropHandler(e: any) {
      e.preventDefault();
      imgParseHandler(e.dataTransfer.files[0]);
   }

   function fileInputHandler(e: any) {
      imgParseHandler(e.target.files[0]);
   }

   function imgParseHandler(file: any) {
      const fileSize = file.size;
      const fileSizeKB = fileSize / 1024 ** 2;

      if (fileSizeKB > 2) {
         alert('Please provide image less than 2MB!');
         return;
      }

      if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.name)) {
         const newImage = new Image();
         newImage.src = URL.createObjectURL(file);

         newImage.onload = () => {
            if (newImage.naturalWidth < 266 || newImage.naturalHeight < 400) {
               alert('Please provide image greater than 532x800 size!');
               return;
            }
            const imgObj = {
               src: newImage.src,
               blob: file,
            };
            setUploadImage(imgObj);
         };
      }
   }

   function inputChangeHandler(key: string, e: FormEvent<HTMLInputElement>) {
      const value = (e.target as HTMLInputElement).value;
      if (isValid(value, key)) {
         setFormError((prev) => {
            return { ...prev, [key]: false };
         });
      }
   }

   function submitHandler(e: any) {
      e.preventDefault();

      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData);
      let isFormValid = true;

      setFormError((prev) => {
         return { ...prev, formValid: true };
      });

      Object.keys(data).forEach((key) => {
         const isItemValid = isValid(data[key], key);
         if (!isItemValid) {
            isFormValid = false;
            setFormError((prev) => {
               return { ...prev, formValid: false, [key]: true };
            });
         }
      });

      if (uploadImage.src.length === 0)
         setFormError((prev) => {
            isFormValid = false;
            return { ...prev, formValid: false, image: true };
         });

      if (!isFormValid) return;

      onSubmit({
         img: uploadImage.blob,
         title: data.title,
         year: data.year,
      });
   }

   function RenderImageInput() {
      if (uploadImage.src.length > 0)
         return (
            <div className="w-full max-w-[473px] h-[372px] md:h-[504px] rounded-[10px] overflow-hidden">
               <img className="w-full h-full object-cover" src={uploadImage.src} alt="uploaded image" />
            </div>
         );
      else
         return (
            <div className="w-full max-w-[473px]">
               <div
                  draggable
                  onClick={() => fileInput.current && (fileInput.current as HTMLInputElement).click()}
                  onDrop={fileDropHandler}
                  onDragOver={(e) => e.preventDefault()}
                  className="w-full h-[372px] md:h-[504px] rounded-[10px] border-dashed border-2 border-white bg-dark-200 cursor-pointer flex items-center justify-center transition duration-200 hover:opacity-80"
               >
                  <div className="flex flex-col items-center">
                     <button className="icon mb-3 w-6">
                        <UploadIcon />
                     </button>
                     <TextSmall>Drop an image here</TextSmall>
                  </div>
                  <input onChange={fileInputHandler} ref={fileInput} type="file" hidden />
               </div>
               {formError.image && <p className="form-error">Please upload an image</p>}
            </div>
         );
   }

   return (
      <form onSubmit={submitHandler}>
         <div className="flex items-start space-x-8 lg:space-x-12">
            {!isMobileView && <RenderImageInput />}
            <div className="w-full max-w-[362px] mx-auto md:mx-0">
               <div className="space-y-6">
                  <TextInput
                     onChange={(e) => {
                        if (!formError.formValid) inputChangeHandler('title', e);
                     }}
                     hasError={formError.title}
                     placeholder="Title"
                     name="title"
                     type="text"
                     label="Title"
                     defaultValue={defaultState?.title || ''}
                  />
                  <TextInput
                     onChange={(e) => {
                        if (!formError.formValid) inputChangeHandler('year', e);
                     }}
                     hasError={formError.year}
                     inputClass="md:max-w-[216px]"
                     placeholder="Publishing year"
                     name="year"
                     type="number"
                     label="Publishing year"
                     defaultValue={defaultState?.publish_year || ''}
                  />
                  {isMobileView && <RenderImageInput />}
               </div>
               <div className="flex space-x-5 mt-8 md:mt-10">
                  <ButtonOutline isLink linkPath="/movies" className="grow">
                     Cancel
                  </ButtonOutline>
                  <Button className="grow">Submit</Button>
               </div>
            </div>
         </div>
      </form>
   );
}
export default MovieForm;
