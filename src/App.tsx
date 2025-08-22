import { useState, useEffect } from "react"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/Card"
import { Alert, AlertDescription } from "./ui/Alert"

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [cardAnimationVar, setCardAnimationVar] = useState("translate-y-[-310px]");
  const [cardOpacityVar, setCardOpacityVar] = useState("opacity-0");
  const [titleAnimationVar, setTitleAnimationVar] = useState("translate-y-[-310px]");
  const [titleOpacityVar, setTitleOpacityVar] = useState("opacity-0");
  const [builtOpacity, setBuiltOpacity] = useState("opacity-0");
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(import.meta.env.VITE_SQUASH_POST!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl })
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError('An error occurred while shortening the URL');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCardAnimationVar("translate-y-[0px]");
      setCardOpacityVar("opacity-100");
    }, 50);

    setTimeout(() => {
      setTitleAnimationVar("translate-y-[0px]");
      setTitleOpacityVar("opacity-100");
    }, 1000);
    
    setTimeout(() => {
      setBuiltOpacity("opacity-100");
    }, 2500);
  }, []);

  return (
  <div className="flex items-center justify-center min-h-screen flex-col">
    <div className="flex items-center justify-center flex-col gap-10">
        <h1 
          className={`transition-all duration-[1500ms] ease-in-out text-5xl font-bold text-orange-600 ${titleAnimationVar} ${titleOpacityVar}`}
          >
            squash
        </h1>
        <Card className={`bg-slate-950 w-[350px] ${cardAnimationVar} ${cardOpacityVar} transition-all duration-[1500ms] ease-in-out`}>
          <CardHeader>
            <CardTitle className="text-center">Input Link Here!</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Input
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Enter long URL"
                required
              />
              <Button type="submit" className="mt-2 w-full bg-purple-600 hover:bg-purple-500">Shorten</Button>
            </form>
          </CardContent>
          <CardFooter>
            {shortUrl && (
              <Alert>
                <AlertDescription>
                  Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
      </div>
      <p className={`${builtOpacity} text-center text-xs font-bold text-[#3b3b3b]`}>
        built by <a target="_blank" href="https://mustaeen.dev/" className="hover:underline">
      must</a></p>
    </div>
  );
};

export default App;
