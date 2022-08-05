import {useParams, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import request from '../requests/Requests'
import ReviewsComponent from '../components/ReviewsComponent'
import RenderReviews from '../components/RenderReviews'

function ProfilePage({getSessionUser, sessionUser}) {
    const {userName} = useParams()
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState()
    const [reviews, setReviews] = useState([])
    
    async function refresh() {
        getSessionUser()
        if (!sessionUser || sessionUser.error === true) navigate('/login')
        else {
            setUserProfile(await request.get(`users/${userName}`))
            setReviews(await request.get(`reviews/${userName}`))
        } 
    }
    
    useEffect(() => {
        refresh()
    }, [])

  return (
    <div >
        {userProfile && 
        <div className='profile-wrapper'>
            <div className='user-card'>
                <img src={userProfile.user.photo} alt="" />
                <h4>{userProfile.user.userName}</h4>
                <ReviewsComponent user={userProfile.user} sessionUser={sessionUser} refresh={refresh}/>
            </div>
            <div>
                <RenderReviews reviews={reviews} />
            </div>
        </div>
        
        }

    </div>
  )
}

export default ProfilePage