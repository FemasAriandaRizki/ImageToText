"use client";
import TextCard from "@/components/Cards/TextCard";
import convertor from "@/lib/convertor";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";

export default function Home() {
  const imgInputRef: any = useRef(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [texts, setTexts] = useState<Array<string>>([]);

  const openBrowse = () => {
    imgInputRef.current?.click();
  };
  const convert = async (url: string) => {
    if (url) {
      setProcessing(true);
      try {
        const txt = await convertor(url);
        if (txt) {
          setTexts((prevTexts) => [...prevTexts, txt]); // Gunakan pembaruan berbasis fungsi
        }
      } finally {
        setProcessing(false);
      }
      // await convertor(url).then((txt) => {
      //   if (txt) {
      //     const copyTexts = texts;
      //     copyTexts.push(txt);
      //     setTexts(copyTexts);
      //   }
      // });
      // setProcessing(false);
    }
  };
  return (
    <div className="text-white">
      <h2 className="px-5 md:pt-20 pt-5 text-center md:text-6xl text-3xl font-[700]">
        Built with{" "}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Tesseract JS
        </span>
      </h2>
      <input
        type="file"
        ref={imgInputRef}
        hidden
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const url: string = URL.createObjectURL(e.target.files?.[0]!);
          // console.log(url);
          convert(url);
        }}
      />
      <div className="w-full md:p-20 p-5 flex items-center justify-center">
        <div
          onClick={openBrowse}
          onDrop={(e: any) => {
            e.preventDefault();
            const url: string = URL.createObjectURL(e.dataTransfer.files?.[0]!);
            // console.log(url);
            convert(url);
          }}
          onDragOver={(e: any) => {
            e.preventDefault();
          }}
          className="w-full p-5 cursor-pointer bg-[#2c2c2c] min-h-[50vh] rounded-xl flex items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <p className="text-center md:text-3xl text-2xl font-[600] text-[#707070]">
              {processing
                ? "Processing Image ..."
                : "Browse or drop your image here."}
            </p>
            <span className="text-[150px] p-4 text-[#707070]">
              <FaImage className={processing ? "animate-pulse" : ""} />
            </span>
          </div>
        </div>
      </div>

      <div className="my-10 md:px-20 px-5 space-y-10">
        {texts?.map((t, i) => {
          return <TextCard key={i} i={i} t={t} />;
        })}
      </div>
    </div>
  );
}
