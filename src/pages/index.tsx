import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Match, MatchRequest } from '../match/types';
import styles from '../styles/Home.module.css';

const Match = (props: Match) => {
  return (
    <tr key={props.requestId}>
      <td>{props.requestId}</td>
      <td>{props.proposalIds.join(' ')}</td>
    </tr>
  );
};

const Room: NextPage = () => {
  const [requestSpreadsheetId, setRequestSpreadsheetId] = useState('');
  const [requestSheetId, setRequestSheetId] = useState('');
  const [proposalSpreadsheetId, setProposalSpreadsheetId] = useState('');
  const [proposalSheetId, setProposalSheetId] = useState('');
  const [matchRequest, setMatchRequest] = useState<MatchRequest>({
    requestSpreadsheetId,
    requestSheetId,
    proposalSpreadsheetId,
    proposalSheetId,
  });
  useEffect(() => {
    setMatchRequest({
      requestSpreadsheetId,
      requestSheetId,
      proposalSpreadsheetId,
      proposalSheetId,
    });
  }, [requestSpreadsheetId, requestSheetId, proposalSpreadsheetId, proposalSheetId]);
  console.log(matchRequest);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMacthes = async () => {
    setIsLoading(true);
    const response = await fetch('/api/matches', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(matchRequest),
    });
    const json = await response.json();
    setMatches(json.matches);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMacthes();
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Matches</h1>
      <div className="flex flex-col justify-center items-center w-2/4">
        <input
          className="w-full text-md text-center items-center mb-2 mt-2"
          type="text"
          placeholder="Requests spreadsheet id: 1fgmYoJMn6282jzdfjsHsdsd788UYc_xUITy6hIL6"
          value={requestSpreadsheetId}
          onChange={(e) => setRequestSpreadsheetId(e.target.value)}
        />
        <input
          className="w-full text-md text-center items-center mb-2"
          type="text"
          placeholder="Requests sheet name: Sheet1"
          value={requestSheetId}
          onChange={(e) => setRequestSheetId(e.target.value)}
        />
        <input
          className="w-full text-md text-center items-center mb-2"
          type="text"
          placeholder="Proposals spreadsheet id: 1fgmYoJMn6282jzdfjsHsdsd788UYc_xUITy6hIL6"
          value={proposalSpreadsheetId}
          onChange={(e) => setProposalSpreadsheetId(e.target.value)}
        />
        <input
          className="w-full text-md text-center items-center mb-2"
          type="text"
          placeholder="Proposals sheet name: Sheet1"
          value={proposalSheetId}
          onChange={(e) => setProposalSheetId(e.target.value)}
        />
        <button disabled={isLoading} className={styles.card} onClick={fetchMacthes}>
          Find matches
        </button>
      </div>
      <table className={styles.matches}>
        <thead>
          <tr>
            <th>Request</th>
            <th>Proposals</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match: Match) => (
            <Match key={match.requestId} {...match} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Room;
