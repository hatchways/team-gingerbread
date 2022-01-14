const fetchProfile = async (id: string, signal: any) => {
  return await fetch(`/profile/load/${id}`, { signal: signal })
    .then((res) => res.json())
    .catch((err) => {
      if (err.name === 'AbortError') {
        return { error: 'aborted successfully' };
      } else {
        return { error: err };
      }
    });
};

export default fetchProfile;
