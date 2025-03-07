'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/db';
import { chatSession } from '@/utils/GeminiAI';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Mic, MicOff } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { toast } from 'sonner';

function AnswerSection({interviewQuestion,activeQuestionIndex,interviewData}) {
    const {user} = useUser();
    const [loading,setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      const [userAnswer , setUserAnswer] = useState('');

      useEffect(()=>{
        results.map((result)=>setUserAnswer(userAnswer + result?.transcript))
      },[results]);

    //   useEffect(()=>{
    //     if(!isRecording && userAnswer?.length>3){
    //       updateUserAnswer();
    //     }
    //   },[userAnswer])
      const StartStopRecording=()=>{
        if(isRecording){
            stopSpeechToText()
        }
        else{
            startSpeechToText()
        }
      }
      const updateUserAnswer=async()=>{
        console.log("user ANswer=",userAnswer);
        
        setLoading(true)
        const feedbackPrompt="Question: "+interviewQuestion[activeQuestionIndex]?.question+", User Answer: "+userAnswer+".Depends on question and user answer for the given interview question "+" please  give us rating( from 0 to 5) for answer and feedback area of improvement if any "+"in just 3 to 5 lines to improve it in JSON Format with rating field and feedback field";

            const result = await chatSession.sendMessage(feedbackPrompt);

            const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
            const JsonFeedbackResp = JSON.parse(mockJsonResp)
            //console.log("mockJsonResp",mockJsonResp);
            //console.log(feedbackPrompt);
            
            // if(JsonFeedbackResp){

              const respDB =await db.insert(UserAnswer).values({
                mockIdRef:interviewData?.mockId,
                question:interviewQuestion[activeQuestionIndex]?.question,
                correctAnswer:interviewQuestion[activeQuestionIndex]?.answer,
                userAnswer:userAnswer,
                feedback:JsonFeedbackResp?.feedback,
                rating:JsonFeedbackResp?.rating,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY'),
              })
              if(respDB){
                //console.log(respDB);
                
                toast("Your Answer is saved.", {
                    description: "Try out the next one👍",
                    
                  })
              }
              
            //}
            setResults([])
            setUserAnswer('')
            setLoading(false)
      }

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-col justify-center items-center bg-secondary rounded-lg p-5 my-10'>

        <Image src={"/webcamImg.png"} width={100} height={100} alt='webcam' className='absolute'/>
        <Webcam
            mirrored={true}
            style={{
                width:'100%',
                height:300,
                zIndex:10,
            }}
        />
        </div>

        <Button disabled={loading} className={`bg-primary text-white hover:text-slate-100 ${isRecording&&'bg-secondary text-red-700 hover:bg-slate-300 hover:text-purple-800'}`} onClick={StartStopRecording}>
            {
                isRecording ? 
                <h2 className='flex items-center gap-1'>
                    <MicOff /> Stop Recording
                </h2> : 
                <h2 className='flex items-center gap-1'>
                    <Mic />
                    Start Recording
                </h2>

            }
           
        </Button>
        <input
      type="text"
      value={userAnswer} // Controlled input
      onChange={(e) => setUserAnswer(e.target.value)}
      className="border p-2"
      placeholder="Type here..."
    />
        <Button onClick={updateUserAnswer
        }>Submit</Button>
    </div>
  )
}

export default AnswerSection