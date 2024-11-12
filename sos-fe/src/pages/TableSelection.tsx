import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import useRestaurantStore from '../store/useRestaurantStore'
import axios from 'axios'
import { IRestaurantBranch } from '../interface'
import NotificationPopup from '../components/Notification'
import ErrorPage from '../components/ErrorPage'

const tables = [
  { id: 1, seats: 4 },
  { id: 2, seats: 6 },
  { id: 3, seats: 2 },
  { id: 4, seats: 2 },
  { id: 5, seats: 8 },
  { id: 6, seats: 4 },
  { id: 7, seats: 4 },
  { id: 8, seats: 4 },
]

const locations = [
  {id: 1, name: 'Garden'}, 
  {id: 2, name: '1st Floor'}, 
  {id: 3, name: '2st Floor'}, 
  {id: 4, name: 'Smoking Area'}
]

export default function TableSelection() {
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedTable, setSelectedTable] = useState<number>(0)
  const [locations, setLocations] = useState<Array<IRestaurantBranch>>([])
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null)

  const showNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string) => {
    setNotification({ type, message })
  }

  const navigate = useNavigate();
  const {setTableNumber, setRoom, tableNumber} = useRestaurantStore();

  const continueOrder = () => {
    if(selectedLocation == ""){
      showNotification('error', 'Please choose restaurant!')
      return;
    }

    if(selectedTable == 0){
      showNotification('error', 'Please select table!')
      return;
    }
    
    setTableNumber(selectedTable);
    setRoom(selectedLocation);
    navigate("/main")
  }

  useEffect(() => {
    if(tableNumber > 0) navigate("/main")

    const fetchRestaurant = async () => {
      try {
        const { data } = await axios.get('/branches');
        setLocations(data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurant()
  }, [])

  if (loading) return (
    <div className="relative w-full bg-white h-screen flex flex-col overflow-hidden">
      <header className="flex items-center mb-6 mt-4">
        <ArrowLeft className="w-6 h-6 text-gray-500 mr-4" />
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </header>

      <h1 className="text-2xl font-bold mb-6">Choose table</h1>

      <div className="flex mb-6 space-x-2 mt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-1 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 mt-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg px-4 py-2 h-[145px] flex flex-col items-center justify-center animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="aboslute bootom-0 left-0 w-full mt-auto">
        <div className="h-[150px] bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );

  if (error) return <ErrorPage />;

  return (
    <div className="h-screen flex items-center justify-center">
      {notification && (
          <NotificationPopup
            type={notification.type}
            message={notification.message}
            duration={1500}
            onDismiss={() => setNotification(null)}
          />
      )}

      <div className="bg-teal-50 h-screen w-full max-w-md overflow-hidden flex flex-col">
        <div className="p-6 space-y-6 flex-grow overflow-auto scrollbar-hide h-screen mb-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <button className="text-gray-600" aria-label="Go back">
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </Link>
              <h1 className="text-xl font-semibold">Galih Restaurant</h1>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Choose table</h2>
          <div className="flex space-x-2 overflow-x-auto pb-2 
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar]:h-2
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-teal-100
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-teal-400
              dark:[&::-webkit-scrollbar-track]:bg-teal-100
              dark:[&::-webkit-scrollbar-thumb]:bg-teal-500">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.branchName)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedLocation === location.branchName
                    ? 'bg-teal-100 text-teal-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {location.branchName}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table.id)}
                className={`relative aspect-[4/3] rounded-lg border-2 flex items-center justify-center overflow-hidden ${
                  selectedTable === table.id
                    ? 'border-teal-500 bg-teal-200'
                    : 'border-gray-200 bg-white'
                }`}
                aria-label={`Table ${table.id} for ${table.seats} people`}
              >
                <img src="/images/table.jpg" alt="table" className='absolute w-full z-1' />
                <span className="text-xl font-semibold text-gray-700 z-10">{table.id}</span>
              </button>
            ))}
          </div>
        </div>

          <button onClick={() => continueOrder()}
            className="absolute bottom-0 w-full bg-teal-600 hover:bg-teal-800 text-white py-4 font-semibold text-lg disabled:bg-teal-200 z-50"
            disabled={!selectedTable}
          >
            Continue
          </button>
      </div>
    </div>
  )
}