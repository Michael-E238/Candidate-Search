import { useState, useEffect } from'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface Candidate {
  id: number;
  name: string;
  username: string;
  location: string;
  avatar_url: string;
  email: string;
  html_url: string;
  company: string;
}

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidate = async () => {
      setLoading(true);
      try {
        const response = await searchGithubUser();
        setCandidate(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, []);

  return (
    <div>
      {loading? (
        <p>Loading...</p>
      ) : (
        <div>
          {candidate? (
            <div>
              <h1>{candidate.name}</h1>
              <p>Username: {candidate.username}</p>
              <p>Location: {candidate.location}</p>
              <p>Avatar: <img src={candidate.avatar_url} alt={candidate.username} /></p>
              <p>Email: {candidate.email}</p>
              <p>HTML URL: {candidate.html_url}</p>
              <p>Company: {candidate.company}</p>
            </div>
          ) : (
            <p>No candidate found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;