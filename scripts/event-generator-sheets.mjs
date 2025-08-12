import fs from 'fs';
import { getCssStringFromCommittee, generateSingleEvent } from './lib.mjs';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Event 1',
    start: '2023-01-01T10:00:00Z',
    end: '2023-01-01T12:00:00Z',
    committee: 'Cloud',
    location: 'Zoom',
    description: 'Description for Event 1',
    links: [],
    banner: '/event1-banner.png',
  },
  {
    id: 2,
    title: 'Event 2',
    start: '2023-01-02T14:00:00Z',
    end: '2023-01-02T16:00:00Z',
    committee: 'Cloud',
    location: 'Room 101',
    description: 'Description for Event 2',
    links: [],
    banner: '/event2-banner.png',
  },
];

// Get all events (mock implementation)
async function getAllEvents() {
  return mockEvents;
}

// Write events (list of event JSONs) to output.json
function writeToOutput(events) {
  const out = JSON.stringify(events);
  fs.writeFile('output.json', out, (err) => {
    if (err) throw err;
    console.log('Output successfully saved to output.json');
  });
}

// Filter single events of a specific committee
function getSingleEventsOfWeek(events) {
  return events.filter((event) => {
    if (!event.committee) return false; // Add null check for committee
    return event.committee.includes('Cloud'); // Example logic
  });
}

export default getAllEvents;
