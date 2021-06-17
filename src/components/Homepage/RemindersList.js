import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { ReminderDetail } from "./RemindersDetail"
import { useHistory, Link } from "react-router-dom"
import { Table, thead, Button } from 'reactstrap';
import backgroundImg from '../Images/SNEAKERS.jpg'
import "./ReminderList.css"

export const ReminderList = () => {
  const { reminders, getReminders, searchTerms, releaseReminder } = useContext(ReminderContext)

  // Since you are no longer ALWAYS displaying all of the reminders
  const [filteredReminders, setFiltered] = useState([])
 
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
    getReminders()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching reminders
      const subset = reminders.filter(reminder => reminder.message.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all reminders
      setFiltered(reminders)
    }
  }, [searchTerms, reminders])

  var sectionStyle = {
    width: "100%",
    height: "937px",
    backgroundImage: `url(${backgroundImg})`
  };

  const handleRelease = (reminderId) => {
    releaseReminder(reminderId)
      .then(() => {
        history.push("/Reminders")
      })
  }

  return (
    <>

      <div style={sectionStyle}>
        <section class="ReminderContainer">

          <div className="reminders"><Table dark><thead><tr><th>Date</th><th>Reminder</th><th>actions</th></tr></thead><tbody>
            {
              filteredReminders.map(reminder => {
                return (
                  <tr>
                   <td>{reminder.date}</td><td>{reminder.message}</td><td><Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '40px' }} onClick={() => {
                      history.push(`/Reminders/${reminder.id}`)
                    }}>edit</Button> <Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '60px' }} onClick={() => handleRelease(reminder.id)}>Delete</Button></td>
</tr>
                  
                )
              })
            }
            </tbody></Table>
            <Button className="text-white" size="sm" style={{ height: '30px', width: '125px' }} color="info" onClick={() => history.push("/Reminders/Create")}>
              New Reminder
            </Button>

          </div>
        </section>
      </div>

    </>
  )
}



