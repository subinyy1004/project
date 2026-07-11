import { useState } from 'react'
import CalendarPage from './pages/CalendarPage'
import CreateMeetingPage from './pages/CreateMeetingPage'
import RecommendTimePage from './pages/RecommendTimePage'
import RecommendDetailPage from './pages/RecommendDetailPage'
import CompletionPage from './pages/CompletionPage'
import MeetingsPage from './pages/MeetingsPage'
import ConfirmationPage from './pages/ConfirmationPage'
import MeetingCompletePage from './pages/MeetingCompletePage'
import TeamsPage from './pages/TeamsPage'

function App() {
  const [page, setPage] = useState('calendar')
  const [meetingForm, setMeetingForm] = useState(null)
  const [viewDate, setViewDate] = useState(null)
  const [newMeetings, setNewMeetings] = useState([])
  const [myMeetings, setMyMeetings] = useState([])
  const [confirmedRequests, setConfirmedRequests] = useState([])
  const [attendanceStatus, setAttendanceStatus] = useState('편하게 가능')

  const handleNavigate = (pageName, formData) => {
    if (formData) {
      if (formData.viewDate) {
        setViewDate(formData.viewDate)
        const { viewDate: vd, _confirmComplete: cc, _time: mt, _duration: md, ...rest } = formData
        if (Object.keys(rest).length > 0) setMeetingForm(prev => ({ ...prev, ...rest }))

        if (cc != null) setConfirmedRequests(prev => [...prev, cc])

        const meetingEntry = {
          date: vd,
          time: mt || meetingForm?.selectedRec?.time?.split(' – ')[0] || '15:00',
          title: meetingForm?.title || '스프린트 회의',
          duration: md || meetingForm?.selectedRec?.time || '15:00 – 16:00',
          status: '편하게 가능',
          participants: [...(meetingForm?.mandatory || []), ...(meetingForm?.optional || [])],
        }
        setNewMeetings(prev => [...prev, meetingEntry])
        if (cc == null) {
          const myEntry = { ...meetingEntry, organizer: '나' }
          setMyMeetings(prev => [...prev, myEntry])
        }
      } else if (formData._saveMeeting) {
        const { _saveMeeting, ...rest } = formData
        if (Object.keys(rest).length > 0) setMeetingForm(prev => ({ ...prev, ...rest }))
        setViewDate(null)

        const rec = meetingForm?.selectedRec
        const time = rec?.time?.split(' – ')[0] || '15:00'
        const duration = rec?.time || '15:00 – 16:00'
        const meetingEntry = {
          date: meetingForm?.startDate,
          title: meetingForm?.title || '스프린트 회의',
          time,
          duration,
          status: '편하게 가능',
          participants: [...(meetingForm?.mandatory || []), ...(meetingForm?.optional || [])],
          mandatory: meetingForm?.mandatory || [],
          optional: meetingForm?.optional || [],
          organizer: '나',
        }
        setNewMeetings(prev => [...prev, meetingEntry])
        setMyMeetings(prev => [...prev, meetingEntry])
      } else if (formData._confirmComplete != null) {
        const { _confirmComplete: requestId, _date: mDate, _time: mTime, _duration: mDuration } = formData
        setConfirmedRequests(prev => [...prev, requestId])

        setNewMeetings(prev => [...prev, {
          date: mDate || meetingForm?.startDate,
          time: mTime || meetingForm?.selectedRec?.time?.split(' – ')[0] || '15:00',
          title: meetingForm?.title || '스프린트 회의',
          duration: mDuration || meetingForm?.selectedRec?.time || '15:00 – 16:00',
          status: '편하게 가능',
          participants: [...(meetingForm?.mandatory || []), ...(meetingForm?.optional || [])],
          mandatory: meetingForm?.mandatory || [],
          optional: meetingForm?.optional || [],
          organizer: '나',
        }])
      } else {
        setMeetingForm(prev => ({ ...prev, ...formData }))
      }
    }
    if (pageName === 'calendar' && !formData?.viewDate) {
      setViewDate(null)
    }
    setPage(pageName)
  }

  if (page === 'create-meeting') {
    return <CreateMeetingPage onNavigate={handleNavigate} />
  }

  if (page === 'recommend-time') {
    return <RecommendTimePage onNavigate={handleNavigate} meetingForm={meetingForm} />
  }

  if (page === 'recommend-detail') {
    return <RecommendDetailPage onNavigate={handleNavigate} meetingForm={meetingForm} selectedRec={meetingForm?.selectedRec} />
  }

  if (page === 'completion') {
    return <CompletionPage onNavigate={handleNavigate} meetingForm={meetingForm} selectedRec={meetingForm?.selectedRec} />
  }

  if (page === 'meetings') {
    return <MeetingsPage onNavigate={handleNavigate} myMeetings={myMeetings} confirmedRequests={confirmedRequests} />
  }

  if (page === 'meeting-confirm') {
    return <ConfirmationPage onNavigate={handleNavigate} meetingForm={meetingForm} />
  }

  if (page === 'meeting-complete') {
    return <MeetingCompletePage onNavigate={handleNavigate} meetingForm={meetingForm} />
  }

  if (page === 'teams') {
    return <TeamsPage onNavigate={handleNavigate} attendanceStatus={attendanceStatus} />
  }

  return <CalendarPage onNavigate={handleNavigate} initialDate={viewDate} newMeetings={newMeetings} attendanceStatus={attendanceStatus} onAttendanceChange={setAttendanceStatus} />
}

export default App
