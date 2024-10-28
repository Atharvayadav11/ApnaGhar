import { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

const DallEPage = () => {
  const [roomPurpose, setRoomPurpose] = useState('');
  const [roomSize, setRoomSize] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [roomStyle, setRoomStyle] = useState('');
  const [furniture, setFurniture] = useState('');
  const [lighting, setLighting] = useState('');
  const [budget, setBudget] = useState('');
  const [decor, setDecor] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const generateImages = async () => {
    setLoading(true);
    setResult('');
    
    // Construct the prompt from the form fields
    const promptText = `Generate an image of a ${roomPurpose} room that is ${roomSize} square feet with a ${colorScheme} color scheme and a ${roomStyle} style. 
                       The room should contain ${furniture} and ${decor}, 
                       with ${lighting} lighting to create a good atmosphere. 
                       The budget for the room design is ${budget}.`;

    const generateOptions = {
      method: 'POST',
      url: 'https://omniinfer.p.rapidapi.com/v2/txt2img',
      headers: {
        'X-RapidAPI-Key': 'af09f5741fmshfb2d5865dcff077p122a3cjsn1daf49c68214',
        'X-RapidAPI-Host': 'omniinfer.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        prompt: promptText,
        negative_prompt: 'nsfw, watermark, facial distortion, lip deformity, redundant background, extra fingers, Abnormal eyesight, ((multiple faces)), ((Tongue protruding)), ((extra arm)), extra hands, extra fingers, deformity, missing legs, missing toes, missin hand, missin fingers, (painting by bad-artist-anime:0.9), (painting by bad-artist:0.9), watermark, text, error, blurry, jpeg artifacts, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, artist name, (worst quality, low quality:1.4), bad anatomy',
        sampler_name: 'Euler a',
        batch_size: 1,
        n_iter: 1,
        steps: 20,
        cfg_scale: 7,
        seed: -1,
        height: 1024,
        width: 768,
        model_name: 'meinamix_meinaV9.safetensors'
      }
    };

    try {
      // Initial request to generate image
      const generateResponse = await axios.request(generateOptions);
      const receivedTaskId = generateResponse.data.task_id;
      setTaskId(receivedTaskId);

      // Poll for the result
      const checkProgress = async () => {
        const progressOptions = {
          method: 'GET',
          url: 'https://omniinfer.p.rapidapi.com/v2/progress',
          headers: {
            'X-RapidAPI-Key': 'af09f5741fmshfb2d5865dcff077p122a3cjsn1daf49c68214',
            'X-RapidAPI-Host': 'omniinfer.p.rapidapi.com'
          },
          params: {
            task_id: receivedTaskId
          }
        };

        const progressResponse = await axios.request(progressOptions);
        const progressData = progressResponse.data;

        if (progressData.status === 'succeeded') {
          setResult(progressData.imgs[0]); // Set the first image URL
          setLoading(false);
        } else if (progressData.status === 'processing') {
          // Continue polling every 2 seconds
          setTimeout(checkProgress, 2000);
        } else {
          throw new Error('Image generation failed');
        }
      };

      // Start polling
      await checkProgress();

    } catch (error) {
      console.error('Error generating image:', error);
      setLoading(false);
      alert('Failed to generate image. Please try again.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateImages();
  };

  return (
    <div className="">
      <Header />
      <main className="grid grid-cols-2 flex-1 w-full flex-col items-center justify-center text-center px-4 background-gradient">
        <div className="max-w-md mx-auto mt-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-6">
              <label htmlFor="room-purpose" className="block text-white-700 font-bold mb-2">
                What is the purpose of the room?
              </label>
              <input
                type="text"
                id="room-purpose"
                className="border rounded-lg py-2 px-3 w-full"
                value={roomPurpose}
                onChange={(event) => setRoomPurpose(event.target.value)}
                placeholder="e.g. bedroom, living room, study"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="room-size" className="block text-white-700 font-bold mb-2">
                What is the size of the room?
              </label>
              <input
                type="text"
                id="room-size"
                className="border rounded-lg py-2 px-3 w-full"
                value={roomSize}
                onChange={(event) => setRoomSize(event.target.value)}
                placeholder="in square feet or meters"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="color-scheme" className="block text-white-700 font-bold mb-2">
                What is the preferred color scheme for the room?
              </label>
              <input
                type="text"
                id="color-scheme"
                className="border rounded-lg py-2 px-3 w-full"
                value={colorScheme}
                onChange={(event) => setColorScheme(event.target.value)}
                placeholder='e.g. "red, white, blue"'
              />
            </div>

            <div className="mb-6">
              <label htmlFor="room-style" className="block text-white-700 font-bold mb-2">
                What is the style you envision for the room?
              </label>
              <input
                type="text"
                id="room-style"
                className="border rounded-lg py-2 px-3 w-full"
                value={roomStyle}
                onChange={(event) => setRoomStyle(event.target.value)}
                placeholder="e.g. modern, rustic, minimalist"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="furniture" className="block text-white-700 font-bold mb-2">
                What type of furniture do you want to include in the room?
              </label>
              <input
                type="text"
                id="furniture"
                className="border rounded-lg py-2 px-3 w-full"
                value={furniture}
                onChange={(event) => setFurniture(event.target.value)}
                placeholder='e.g. "sofa, table, chair"'
              />
            </div>

            <div className="mb-6">
              <label htmlFor="lighting" className="block text-white-700 font-bold mb-2">
                What is your preferred lighting for the room?
              </label>
              <input
                type="text"
                id="lighting"
                className="border rounded-lg py-2 px-3 w-full"
                value={lighting}
                onChange={(event) => setLighting(event.target.value)}
                placeholder="e.g. natural light, warm light, bright light"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="budget" className="block text-white-700 font-bold mb-2">
                What is your budget for the room?
              </label>
              <input
                type="text"
                id="budget"
                className="border rounded-lg py-2 px-3 w-full"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder='e.g. "1000k, 2000k, 3000k"'
              />
            </div>

            <div className="mb-6">
              <label htmlFor="decor" className="block text-white-700 font-bold mb-2">
                What type of decor do you want to include in the room?
              </label>
              <input
                type="text"
                id="decor"
                className="border rounded-lg py-2 px-3 w-full"
                value={decor}
                onChange={(event) => setDecor(event.target.value)}
                placeholder='e.g. "plants, paintings, sculptures"'
              />
            </div>

            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center h-full">
          {result ? (
            <img className="max-w-full max-h-[80vh] object-contain" src={result} alt="Generated room" />
          ) : loading ? (
            <>
              <div className="text-center">
                <div className="text-3xl mb-4">Generating... Please Wait</div>
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">You'll see the Result here!</div>
                <div className="text-3xl">😉</div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DallEPage;


