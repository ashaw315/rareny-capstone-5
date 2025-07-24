module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      # Try both session cookie names
      session_keys = ["_react_rails_api_project_template_session", "_session_id"]
      
      Rails.logger.debug "=== Action Cable Connection Debug ==="
      
      session_keys.each do |session_key|
        Rails.logger.debug "Trying session key: #{session_key}"
        Rails.logger.debug "Session cookie present: #{cookies.encrypted[session_key].present?}"
        
        if session_data = cookies.encrypted[session_key]
          Rails.logger.debug "Session data found: #{session_data}"
          if user_id = session_data["user_id"]
            Rails.logger.debug "Found user_id in session: #{user_id}"
            user = User.find_by(id: user_id)
            if user
              Rails.logger.debug "Successfully authenticated user: #{user.username}"
              return user
            else
              Rails.logger.debug "User not found in database for id: #{user_id}"
            end
          else
            Rails.logger.debug "No user_id found in session data"
          end
        else
          Rails.logger.debug "No session data found for key: #{session_key}"
        end
      end

      # Debug logging to help troubleshoot
      Rails.logger.debug "Action Cable connection rejected - no valid session found"

      # Reject connection if no valid user found
      reject_unauthorized_connection
    end
  end
end
