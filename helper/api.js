



export async function getAllEvents() {
    //    https://checking-a9349-default-rtdb.asia-southeast1.firebasedatabase.app/events.json

    const response = await fetch('https://checking-a9349-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')


    // const response = await fetch('https://nextjs-dummydata-2c11b-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')
    const data = await response.json();
    const events = [];
    for (const key in data) {
        events.push({
            id: key,
            ...data[key]
        });
    }
    return data;
}




export async function getFeaturedEvents() {
    const allEvents = await getAllEvents()


    return allEvents.filter((event) => event.isFeatured);
}









export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    let allEvents = await getAllEvents();
    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);

        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });


    return filteredEvents;
}


export async function getEventById(id) {
    let allEvents = await getAllEvents();

    return allEvents.find((event) => event.id === id);
}

export const fetcher = url => fetch(url).then(r => r.json())












