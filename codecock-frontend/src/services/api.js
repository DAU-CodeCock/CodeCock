export const fetchMentors = async () => {
    const response = await fetch('/api/mentors');
    return response.json();
};

export const fetchMentees = async () => {
    const response = await fetch('/api/mentees');
    return response.json();
};

export const fetchBoardPosts = async () => {
    const response = await fetch('/api/boardPosts');
    return response.json();
};
