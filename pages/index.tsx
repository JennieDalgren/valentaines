import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import DropDown2, { RelationType } from "../components/DropDown2";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [respondent, setRespondent] = useState("");
  const [sender, setSender] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Quirky");
  const [relation, setRelation] = useState<RelationType>("friend");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  console.log("Streamed response: ", generatedBios);

  //   Quirky: Write a message that's playful and offbeat, incorporating your own personal humor and quirks.

  // Enchanted: Create a fairy-tale like atmosphere, expressing the magic and enchantment you feel in your relationship.

  // Adventure: Write a message that highlights the exciting journey and adventures you've shared together, and how much more there is to come.

  // Cosmic: Write a message that's out of this world, using celestial and cosmic language to express your love.

  // Dreamy: Write a message that's dreamlike, expressing how your partner makes you feel as if you're living in a dream.

  // Romantic: Express your love and affection for your partner with sweet and sentimental words.

  const prompt =
    vibe === "Quirky"
      ? `Generate 2 messages that's playful and offbeat, incorporating your own personal humor and quirks, clearly labeled "1." and "2.". A love letter to ${respondent}, include the name, who is the sender's ${relation}. Make sure each generated message is at max 60 words and if there's some extra info applied, here it is: ${bio}. End the love letter in a funny way, from ${sender}${
          bio.slice(-1) === "." ? "" : "."
        }`
      : vibe === "Enchanted"
      ? `Generate 2 messages in a fairy-tale like atmosphere, expressing the magic and enchantment you feel in your relationship, clearly labeled "1." and "2.". A love letter to ${respondent}, include the name, who is the sender's ${relation}. Make sure each generated message is at max 60 words and if there's some extra info applied, here it is: ${bio}. End the love letter in an enchanted way, from ${sender}${
          bio.slice(-1) === "." ? "" : "."
        }`
      : vibe === "Adventurous"
      ? `Generate 2 messages that highlights the exciting journey and adventures you've shared together, and how much more there is to come, clearly labeled "1." and "2.". A love letter to ${respondent}, include the name, who is the sender's ${relation}. Make sure each generated message is at max 60 words and if there's some extra info applied, here it is: ${bio}. End the love letter in an epic way, from ${sender}${
          bio.slice(-1) === "." ? "" : "."
        }`
      : vibe === "Cosmic"
      ? `Generate 2 messages that's out of this world, using celestial and cosmic language to express your love, clearly labeled "1." and "2.". A love letter to ${respondent}, include the name, who is the sender's ${relation}. Make sure each generated message is at max 60 words and if there's some extra info applied, here it is: ${bio}. End the love letter in an crazy cosmic way, from ${sender}${
          bio.slice(-1) === "." ? "" : "."
        }`
      : vibe === "Dreamy"
      ? `Generate 2 messages that's dreamlike, expressing how your partner makes you feel as if you're living in a dream, clearly labeled "1." and "2.". A love letter to ${respondent}, include the name, who is the sender's ${relation}. Make sure each generated message is at max 60 words and if there's some extra info applied, here it is: ${bio}. End the love letter in an dreamy way, from ${sender}${
          bio.slice(-1) === "." ? "" : "."
        }`
      : `Generate 2 messages where ${sender} expresses their love and affection for their ${relation} ${respondent}, with sweet and sentimental words, clearly labeled "1." and "2.". Make sure each generated message is at max 60 words and if there's some extra touch to, here it is: ${bio}. End the love letter in a romantic way, from ${sender}${
          bio.slice(-1) === "." ? "" : "."
        }`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex mx-auto flex-col items-center justify-center pb-2 min-h-screen">
      <Head>
        <title>Valentine's Message Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          A love letter for your Valentine 💕
        </h1>
        <p className="text-slate-500 mt-5">Generate one in seconds</p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">Fill in some deets.</p>
          </div>

          <input
            required
            maxLength={50}
            value={respondent}
            onChange={(e) => setRespondent(e.target.value)}
            type="text"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"What's the name of your Valentine?"}
          />

          <div className="block">
            <DropDown2
              relation={relation}
              setRelation={(newRelation) => setRelation(newRelation)}
            />
          </div>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "write a few sentences here that you think is important for this Valentine's card."
            }
          />

          <input
            maxLength={50}
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            type="text"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black mb-10"
            placeholder={"Who is this from?"}
          />

          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Generate your love letter &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedBios && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your generated love letters
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {generatedBios
                      .substring(generatedBios.indexOf("1") + 3)
                      .split("2.")
                      .map((generatedBio) => {
                        return (
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedBio);
                              toast("Bio copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={generatedBio}
                          >
                            <p>{generatedBio}</p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
