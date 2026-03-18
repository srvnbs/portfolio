export type CaseStudySection = {
  title: string;
  content: string[];
  images?: string[];
};

export type CaseStudy = {
  subtitle: string;
  overview: string;
  heroImages?: string[];
  sections: CaseStudySection[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    id: 'kirana-points',
    title: 'Kirana Points',
    description: 'A loyalty points system for retail kirana stores.',
    url: 'https://www.behance.net/gallery/236191079/Kirana-Points-Case-Study',
    image: '/images/projects/kirana-points.png',
  },
  {
    id: 'habit-box',
    title: 'Habit Box',
    description: 'A digital product for building and tracking daily habits.',
    url: 'https://www.behance.net/gallery/236186923/Habit-Box-Case-Study',
    image: '/images/projects/habit-box/hero-home.png',
    caseStudy: {
      subtitle: 'A habit tracker app',
      overview: 'Habit box is designed to provide users with a tool that not only tracks their daily habits but also motivates and encourages them to stay consistent.',
      heroImages: [
        '/images/projects/habit-box/hero-home.png',
        '/images/projects/habit-box/hero-reminders.png',
        '/images/projects/habit-box/hero-new-habit.png',
      ],
      sections: [
        {
          title: 'Information Sorting',
          content: [
            'In the navigation bar, I\'ve categorized the list of habits and stats into separate sections because both of those have the opportunity to show in a very detailed manner and to avoid information overload in the home page.',
            'Stats has both my performance and leaderboard. My performance indicates the milestones, achievements, failures and stats of the user\'s habit forming journey. Leaderboard is the comparison of users with other users of the app to let know how well the goals are being achieved.',
            'In the homepage, the top card serves as a dynamic component. This will show the top milestones of the user in a positive scenario. In a negative scenario, it will display tricks and quotes to motivate users to be consistent in habit forming goals.',
            'Reminders as a separate section will display only the current hour\'s tasks in the homepage. On swiping up this section, this will become a full screen and the entire day with all the reminders of the day will be displayed. The CTA to add a new reminder is at the thumb\'s reach.',
            'CTA is to add a new habit and is just above the navigation bar within thumb\'s reach. This is because adding a new habit is the primary action in the app and the user needs to find it readily.',
          ],
          images: ['/images/projects/habit-box/2.png'],
        },
        {
          title: 'Simplifying Habit Management',
          content: [
            'Daily habits: A reminder is added at defined intervals while creating the habit itself. To track the overall habit, the reminders can be tracked day-wise. The thought behind this is to break a major task into small chunks, make those as goals and track them to understand the overall progress. Also, this will make the chances of forming a routine more.',
            'Track daily: A separate section for tracking is made so that the user will track the overall habits there. Users can also track the contribution to the overall goal through the reminder card. This will indicate the progress of the current reminder task to the overall habit forming. The thought behind this is to make the user focus on current tasks instead of worrying about the whole journey everyday.',
            'Manage reminders: On clicking the reminder card, users can be directly landed into that specific habit page. There, users can edit the reminders frequency, goals, and also see some stats specific to it. This is to make sure that the user can easily change the reminders whenever needed.',
          ],
          images: ['/images/projects/habit-box/10.png'],
        },
        {
          title: 'Visualise Progress',
          content: [
            'Progress bars: Each reminder card will have a progress bar. This will indicate the contribution made till current time to the overall habit forming journey. This will reinforce the users will power to be consistent and not to break the progress.',
            'A circular progress bar is present at the right corner of the reminders section. This will indicate the progress of all the habits in that current day. This will make sure the users have a visibility of a day\'s progress in addition to habit-wise progress.',
          ],
          images: ['/images/projects/habit-box/3.png', '/images/projects/habit-box/4.png', '/images/projects/habit-box/5.png'],
        },
        {
          title: 'Motivate, Engage and Give Sense of Achievement',
          content: [
            'Top section of homepage: This will be dynamic based on the scenario. If the user is not performing well, a quote / trick to keep consistent habits will appear. This will inspire the user to put steps towards a habit. If performing well, the user\'s top stats of the week will appear. This will give the user a sense of achievement and boosts the engagement with a habit. In this case, there will be an option to share with friends. The thought behind it is: announcing in social media will likely make the user take up the habit more often.',
            'Progress Bars: At reminders, if the habit is near to completion, the progress bar will indicate the remaining journey while highlighting the completed journey. If it is just started, then the progress of the completed journey is only highlighted instead of indicating there\'s a lot to complete. This will keep the user\'s spirits high.',
            'Streak: At reminders, streak is mentioned if the user is consistent with that habit. This indication will make the user keep continuing the habit more likely.',
            'Leaderboard: Leaderboard is comparing the current user\'s stats with other users and ranking. For example, if the user is said to be among the 5% club, this will increase the chances of taking up the habit more. The thought behind this is: social comparison theory - user values personal worth more when compared to others.',
          ],
          images: ['/images/projects/habit-box/6.png', '/images/projects/habit-box/7.png', '/images/projects/habit-box/8.png'],
        },
        {
          title: 'Adding New Habits',
          content: [
            'New habits can be added from the homepage itself, by the click of CTA. On clicking the CTA, a chat interface opens up where the user can type the habit goal and the app will figure out the name of the habit, reminder frequency and target days. To be more accessible, a facility to enter the habit goal through audio also exists here. The decision of the chat interface is taken to minimize the user inputs and make the experience better.',
          ],
          images: ['/images/projects/habit-box/9.png'],
        },
        {
          title: 'Focus and Less Clutter',
          content: [
            'To decrease the cognitive and visual load, only the needed information is shown on the screen. For example, in the reminders only current hour reminders are shown and users can check them easily from there to mark as finished. Same way, only the current hour\'s reminders are highlighted when viewing the entire day\'s reminders too.',
          ],
        },
        {
          title: 'Easy to Understand',
          content: [
            'From adding new habits via chat and audio interfaces, progress bars to viewing and editing reminders, every component is made from the most familiar interface elements and making it easily understandable without much training.',
          ],
        },
        {
          title: 'Delightful and Modern Interface',
          content: [
            'A clean and modern looking interface makes users use the app more frequently thereby increasing the opportunity to engage with the habits. Purple color is associated with royalty and white with blurred colors in the background gives a delightful feel. Combined together, will give the app a more modern visual.',
          ],
        },
      ],
    },
  },
  {
    id: 'wallet-genz',
    title: 'A Wallet for Gen Z',
    description: 'A modern digital wallet tailored for Generation Z users.',
    url: 'https://www.behance.net/gallery/168678339/Wallet-for-Gen-Z',
    image: '/images/projects/wallet-genz.jpg',
  },
  {
    id: 'clean-chef',
    title: 'Clean Chef',
    description: 'A clean, modern interface for a culinary application.',
    url: 'https://www.behance.net/gallery/109574379/Clean-Chef',
    image: '/images/projects/clean-chef.png',
  },
  {
    id: 'blinkers-website',
    title: 'Blinkers — Website',
    description: 'Website presentation for the Blinkers road travel app.',
    url: 'https://www.behance.net/gallery/90383485/Website-presentation-for-Blinkers-app',
    image: '/images/projects/blinkers-website.png',
  },
  {
    id: 'blinkers-android',
    title: 'Blinkers — Android',
    description: 'Android app design for the Blinkers travel platform.',
    url: 'https://www.behance.net/gallery/90383273/Android-app-presentation-for-Blinkers',
    image: '/images/projects/blinkers-android.png',
  },
  {
    id: 'blinkers-ios',
    title: 'Blinkers — iOS',
    description: 'iOS app presentation for the Blinkers travel platform.',
    url: 'https://www.behance.net/gallery/90380185/iOS-app-presentation-for-Blinkers',
    image: '/images/projects/blinkers-ios.png',
  },
  {
    id: 'blinkers-case-study',
    title: 'Blinkers — UX Case Study',
    description: 'UX case study solving common road travel challenges.',
    url: 'https://www.behance.net/gallery/90381273/Blinkers-UX-Case-Study',
    image: '/images/projects/blinkers-case-study.png',
  },
];
