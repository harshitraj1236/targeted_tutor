import { useContext, useEffect } from "react"
import { useParams } from "react-router"
import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"

export const useInerview = () => {
    const context = useContext(IntetviewContext)
    const { interviewId } = useParams()

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = constext

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
        }
        catch (error) {
            console.log(error)
        } 
        finally {
            setLoading(false)
        }

        return response.interviewReport
    }


    const getreportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try{
            response = await getInterviewReportById({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }

        return response.interviewReport
    }


    const getReports = async () => {
        setLoading(true)
        let response = null
        try{
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }

        return response.interviewReports
    }


    const getResumePdf = async () => {
        setLoading(true)
        let response = null
        try{
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href =  url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(true)
        }
    }

    useEffect(()=>{
        if(interviewId){
            getreportById(interviewId)
        }
        else{
            getReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }
    
}