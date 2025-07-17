require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject { build(:user) }

    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_length_of(:password).is_at_least(6) }

    context 'password validations' do
      it 'allows updates without changing password' do
        user = create(:user)
        user.update(bio: 'Updated bio')
        expect(user).to be_valid
      end

      it 'requires password confirmation to match' do
        user = build(:user, password: 'password123', password_confirmation: 'different')
        expect(user).not_to be_valid
      end
    end

    context 'optional fields' do
      it 'allows blank bio, website, and discipline' do
        user = build(:user, :without_optional_fields)
        expect(user).to be_valid
      end
    end
  end

  describe 'associations' do
    it { should have_many(:profile_pictures).dependent(:destroy) }
    it { should have_many(:listings).dependent(:destroy) }
    it { should have_many(:comments).dependent(:destroy) }
    it { should have_many(:forum_posts).dependent(:destroy) }
    it { should have_many(:subforums).through(:forum_posts) }
  end

  describe 'secure password' do
    it 'encrypts password using bcrypt' do
      user = create(:user, password: 'password123')
      expect(user.password_digest).to be_present
      expect(user.password_digest).not_to eq('password123')
    end

    it 'authenticates with correct password' do
      user = create(:user, password: 'password123')
      expect(user.authenticate('password123')).to eq(user)
    end

    it 'does not authenticate with incorrect password' do
      user = create(:user, password: 'password123')
      expect(user.authenticate('wrong_password')).to be_falsey
    end
  end

  describe '#member_since' do
    it 'returns formatted creation date' do
      user = create(:user)
      expected_date = user.created_at.strftime("%m/%d/%Y")
      expect(user.member_since).to eq(expected_date)
    end
  end

  describe 'factory' do
    it 'creates a valid user' do
      user = build(:user)
      expect(user).to be_valid
    end

    it 'creates unique usernames' do
      user1 = create(:user)
      user2 = create(:user)
      expect(user1.username).not_to eq(user2.username)
    end
  end

  describe 'deletion cascades' do
    it 'destroys associated records when user is deleted' do
      user = create(:user)
      listing = create(:listing, user: user)
      comment = create(:comment, user: user)
      forum_post = create(:forum_post, user: user)

      expect { user.destroy }.to change { Listing.count }.by(-1)
        .and change { Comment.count }.by(-1)
        .and change { ForumPost.count }.by(-1)
    end
  end
end
