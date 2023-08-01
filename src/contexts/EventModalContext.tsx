import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';
import EventModal from '../components/EventModal';

interface IEventModalContext {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormEventIntervalState {
    eventStart: dayjs.Dayjs;
    eventEnd: dayjs.Dayjs;
}
interface IEventFormContext {
    formEventInterval: IFormEventIntervalState;
    setFormEventInterval: React.Dispatch<
        React.SetStateAction<IFormEventIntervalState>
    >;
}

// contexts definitions
const EventModalContext = createContext<IEventModalContext | null>(null);
// for some reason i decided not to split this context :/
const EventFormContext = createContext<IEventFormContext | null>(null);

// hooks for accessing the context
export function useEventModal() {
    const context = useContext(EventModalContext);
    if (context === null) {
        throw Error('Context not Provided');
    }

    return context;
}
export function useEventForm() {
    const context = useContext(EventFormContext);
    if (context === null) {
        throw Error('Context not Provided');
    }

    return context;
}

const today = dayjs();

// Provider that wraps all contexts
export default function EventModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formEventInterval, setFormEventInterval] =
        useState<IFormEventIntervalState>({
            eventStart: today,
            eventEnd: today,
        });

    return (
        <EventFormContext.Provider
            value={{ formEventInterval, setFormEventInterval }}
        >
            <EventModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
                {children}
                <EventModal />
            </EventModalContext.Provider>
        </EventFormContext.Provider>
    );
}
