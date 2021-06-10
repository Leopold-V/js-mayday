import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import '../markdown.css';

import userServices from '../services/user.services';
import questionServices from '../services/question.services';

import { MainLayout } from '../components/MainLayout';
import { Discussion } from '../components/Discussion';
import { ButtonLike, ButtonRead } from '../components/Button';
import { QuestionListTags } from '../components/Question';

const components = {
  code({
    node,
    inline,
    className,
    children,
    ...props
  }: {
    node: any;
    inline: any;
    className: string;
    children: ReactNode;
  }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
};

export const QuestionPage = (props: any) => {
  const questionId = props.match.params.id;

  const [question, setQuestion] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const loadAuthor = async (id: string) => {
    const user = await userServices.getOneUser(id);
    setUser(user);
  };

  useEffect(() => {
    (async () => {
      const question: any = await questionServices.getOneQuestion(questionId);
      setQuestion({
        ...question,
        date: new Date(question.date.seconds * 1000).toDateString(),
        edit_date: new Date(question.edit_date.seconds * 1000).toDateString(),
      });
      await loadAuthor(question.authorId);      
    })();
  }, [questionId]);

  if (!question)
    return (
      <MainLayout>
        <h1>Post not found</h1>
      </MainLayout>
    );
  if (!user)
    return (
      <MainLayout>
        <div className="card h-96"></div>
      </MainLayout>
    );
  return (
    <MainLayout>
      <div className="card relative">
        <div className="space-y-3">
          <div className="absolute top-3 right-3 flex items-center space-x-4">
            {user && (
              <Link
                to={`/edit/${questionId}`}
                className="text-muted focus:outline-none hover:bg-gray hover:text-primary transition duration-200 rounded px-2 py-1"
              >
                Edit
              </Link>
            )}
            <ButtonRead id={questionId} />
            <ButtonLike id={questionId} />
          </div>
          <h1 className="text-white text-4xl font-extrabold py-3">{question.title}</h1>
          <QuestionListTags tags={question.tags} />
          <div className="flex items-center space-x-4">
            <Link
              to={`/profile/${user.userId}`}
              className="flex items-center space-x-2 hover:text-blue transition duration-200"
            >
              <div className="w-8">
                <img
                  className="rounded-full"
                  alt="profile_picture"
                  src={user.avatar || 'https://randomuser.me/portraits/men/52.jpg'}
                />
              </div>
              <div>{user.username || 'Anonymous'}</div>
            </Link>
            <div className="text-muted text-sm">{question.date}</div>
          </div>
          <ReactMarkdown
            className="markdown"
            remarkPlugins={[gfm]}
            children={question.content}
            //@ts-ignore
            components={components}
          />
        </div>
        <Discussion />
      </div>
    </MainLayout>
  );
};
