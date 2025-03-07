"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import AnswerSection from './_components/AnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {
    const actualParams = use(params);
    const interviewId = actualParams.interviewId;
    const [interviewData , setInterviewData] = useState();
    const [interviewQuestion, setInterviewQuestion] = useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
    useEffect(()=>{
        getInterviewDetails()
    },[]);
    const getInterviewDetails=async()=>{
        const resp = await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId));
        if(resp){
            const jsonMockRes = JSON.parse(resp[0]?.jsonMockResp)
            // console.log(jsonMockRes);
            // console.log(resp[0]);
            setInterviewQuestion(jsonMockRes)
            setInterviewData(resp[0]);
        }
    }
  return (
    <div>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {/* Questions */}
            <QuestionSection
                interviewQuestion={interviewQuestion} 
                activeQuestionIndex={activeQuestionIndex}
            />

            {/* Video and Mic */}
            <AnswerSection
                interviewQuestion={interviewQuestion} 
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
            />
        </div>
        <div className='flex justify-center  md:justify-end gap-5 my-5'>
            { activeQuestionIndex>0 &&
                <Button onClick={()=>setActiveQuestionIndex(prev=>prev-1)} className="bg-sky-600 text-white">Previous Question</Button>
            }
            { activeQuestionIndex<(process.env.NEXT_PUBLIC_QUESTION_COUNT-1)&&
                <Button onClick={()=>setActiveQuestionIndex(prev=>prev+1)} className="bg-green-600 text-white">Next Question</Button>
            }
            {
                activeQuestionIndex===(process.env.NEXT_PUBLIC_QUESTION_COUNT-1)&&
                <Link href={`/dashboard/interview/${interviewId}/feedback`}>
                    <Button className="bg-red-600 text-white hover:text-slate-100">End Interview</Button>
                </Link>
            }
        </div>
    </div>
  )
}

export default StartInterview