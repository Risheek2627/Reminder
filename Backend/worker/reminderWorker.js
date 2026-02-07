const reminderQueue = require("../queues/reminderQueue");
const sendEmail = require("../utils/sendEmail");

reminderQueue.process(async (job) => {
  const { title, email, type } = job.data;
  console.log("JOB RECEIVED:", job.data);
  console.log("Sending to:", email);

  await sendEmail(
    email,
    "📚 Revision Reminder",
    `
  <div style="font-family: Arial; padding: 20px; background-color: #f4f6f8;">
    
    <div style="max-width: 500px; margin: auto; background: white; border-radius: 10px; padding: 25px;">
      
      <h2 style="color: #4CAF50;">⏰ Revision Time!</h2>
      
      <p style="font-size: 16px; color: #333;">
        Hey Champ 👋
      </p>

      <p style="font-size: 16px; color: #555;">
        It's time to revise your topic:
      </p>

      <div style="background: #eef7ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <strong style="font-size: 18px;">${title}</strong>
        <p style="color: #777; margin: 5px 0;">${type}</p>
      </div>

      <p style="color: #666;">
        Keep your DCET preparation strong 💪  
        Consistent revision builds long-term memory.
      </p>

      <hr style="margin: 20px 0;" />

      <p style="font-size: 12px; color: #999;">
        Smart Revision Reminder System 🚀
      </p>

    </div>

  </div>
  `,
  );
});
