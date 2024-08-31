# PathWise AI

![Alt text](/public/show-image.png)

**PathWise AI** is a dynamic learning path generator that helps users create personalised learning paths for any topic they choose. Developed using React 18, Tailwind CSS, Express, Node.js, Gemini 1.5 Flash API, and YouTube API, this app allows users to easily explore, track, and complete their learning journeys.

#### Live - http://89.116.33.28:4545/

## Features

- **Prompt-Based Learning Path Generation**: Enter a topic prompt, and PathWise AI will generate a comprehensive learning path.
- **Video References**: Each step in the learning path is supplemented with relevant YouTube videos for better understanding.
- **Progress Tracking**: Save your learning path locally and mark topics as completed. Track your progress with a completion percentage.
- **Light/Dark Mode**: Switch between light and dark modes for a comfortable viewing experience.

## Technology Stack

- **Frontend**:
  - React 18
  - Tailwind CSS
- **Backend**:
  - Express.js
  - Node.js
- **APIs**:
  - Gemini 1.5 Flash API for learning path generation
  - YouTube API for fetching relevant video content

## Docker Information

PathWise AI is containerized to simplify deployment. You can find the Docker images (in
linux/amd64 arch) for both the frontend and backend on Docker Hub:

- **Backend Docker Image**:
  - Repository: [soumyabrata024/pathwise-ai-backend](https://hub.docker.com/repository/docker/soumyabrata024/pathwise-ai-backend/general)
  - Run the backend container with the following command:
    ```bash
    docker pull soumyabrata024/pathwise-ai-backend:latest
    docker run -d -p 4545:3000 soumyabrata024/pathwise-ai-backend:1.0
    ```
- **Frontend Docker Image**:
  - Repository: [soumyabrata024/pathwise-ai-ui](https://hub.docker.com/repository/docker/soumyabrata024/pathwise-ai-ui/general)
  - Run the frontend container with the following command:
    ```bash
    docker pull soumyabrata024/pathwise-ai-ui:latest
    docker run -d -p 3001:3001 soumyabrata024/pathwise-ai-ui:1.0
    ```

## Usage

1. **Generate a Learning Path**:
   - Enter a learning topic in the prompt input.
   - PathWise AI will generate a step-by-step learning path with video references.
2. **Track Your Progress**:
   - As you complete each step, mark it as "completed."
   - View your overall progress percentage.
3. **Switch Between Light and Dark Mode**:
   - Use the toggle button to switch between light and dark mode according to your preference.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Acknowledgements

- Special thanks to the open-source community for providing tools and libraries that made this project possible.
