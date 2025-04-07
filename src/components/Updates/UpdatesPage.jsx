import Updates from './Updates';
import './UpdatesPage.css';

export default function UpdatesPage({ section, setSection }) {
  return (
    <div className="updates-page-container">
      <Updates section={section} setSection={setSection} />
    </div>
  );
} 