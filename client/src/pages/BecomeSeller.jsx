import React, { useState, useEffect } from 'react';
import { useBecomeSellerMutation, useLoadUserQuery } from '@/features/auth/authApi';

const questions = [
  {
    id: 1,
    question: "Can you list products after becoming a seller?",
    options: ["No", "Yes"],
    answer: "Yes",
  },
  {
    id: 2,
    question: "Do you agree to follow our seller terms & conditions?",
    options: ["Yes", "No"],
    answer: "Yes",
  },
  {
    id: 3,
    question: "Can a seller delete user reviews?",
    options: ["Yes", "No"],
    answer: "No",
  },
  {
    id: 4,
    question: "Is it mandatory to provide genuine product info?",
    options: ["Yes", "No"],
    answer: "Yes",
  },
];

const BecomeSeller = () => {
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [becomeSeller, { isLoading: isSubmitting }] = useBecomeSellerMutation();

  const [answers, setAnswers] = useState({});
  const [isQuizPassed, setIsQuizPassed] = useState(false);

  const handleOptionChange = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  useEffect(() => {
    const allCorrect = questions.every(
      (q) => answers[q.id] && answers[q.id] === q.answer
    );
    setIsQuizPassed(allCorrect);
  }, [answers]);

  const handleUpgrade = async () => {
    try {
      await becomeSeller().unwrap();
      await refetch();
      alert(" Congratulations! You are now a seller.");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  const user = data?.user;
  if (!user || user.role === 'seller') return null;

  return (
    <div className="max-w-xl mx-auto my-10 bg-white shadow-lg rounded-2xl p-6 border h-[75vh] overflow-y-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Hello {user.name}, ready to become a seller?
      </h2>

      {questions.map((q) => (
        <div key={q.id} className="border p-4 rounded-lg bg-gray-50">
          <p className="font-medium mb-2">{q.question}</p>
          <div className="space-y-1">
            {q.options.map((opt) => (
              <label key={opt} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleOptionChange(q.id, opt)}
                  className="accent-blue-600"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleUpgrade}
        disabled={!isQuizPassed || isSubmitting}
        className={`w-full py-2 px-4 rounded-xl text-white font-semibold transition duration-200 ${
          isQuizPassed
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? 'Upgrading...' : 'Become a Seller'}
      </button>
    </div>
  );
};

export default BecomeSeller;
