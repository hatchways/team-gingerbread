const fetchProfile = async (id: string) => {
  return await fetch(`/profile/load/${id}`)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default fetchProfile;
