import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createListing } from '../store/slices/listingsSlice';
import ImageUpload from './ImageUpload';
import ErrorBoundary from './ErrorBoundary';
import { Button, Input, Select, Card } from './ui';
import styled from "styled-components";

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
  justify-content: center;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  color: #e03131;
  background: #fff5f5;
  padding: 10px;
  border: 1px solid #fcc2c3;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const boroughs = ['Manhattan', 'Brooklyn', 'Bronx', 'Queens', 'Staten Island'];

function ListingsForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Get user and loading state from Redux
  const { user } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.listings);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    neighborhood: '',
    nycBorough: '',
    price: '',
    sqFootage: '',
    email: '',
    description: ''
  });

  // Image states
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null
  });

  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (imageKey, file) => {
    setImages(prev => ({
      ...prev,
      [imageKey]: file
    }));
  };

  const handleImageRemove = (imageKey) => {
    setImages(prev => ({
      ...prev,
      [imageKey]: null
    }));
  };

  const validateForm = () => {
    const newErrors = [];
    
    if (!formData.title.trim()) newErrors.push("Title is required");
    if (!formData.neighborhood.trim()) newErrors.push("Neighborhood is required");
    if (!formData.nycBorough) newErrors.push("Borough is required");
    if (!formData.price || formData.price <= 0) newErrors.push("Valid price is required");
    if (!formData.sqFootage || formData.sqFootage <= 0) newErrors.push("Valid square footage is required");
    if (!formData.email.trim()) newErrors.push("Email is required");
    if (!formData.description.trim()) newErrors.push("Description is required");
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    
    // Append form fields
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    
    // Append images
    Object.keys(images).forEach(imageKey => {
      if (images[imageKey]) {
        formDataToSend.append(imageKey, images[imageKey]);
      }
    });

    try {
      await dispatch(createListing(formDataToSend)).unwrap();
      navigate('/listings');
    } catch (err) {
      setErrors([err || 'Failed to create listing']);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Please log in to create a listing.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary fallbackMessage="Listing form failed to load.">
      <Wrapper>
        <WrapperChild>
          <Card padding="lg">
            <Card.Header>
              <Card.Title>Create New Listing</Card.Title>
            </Card.Header>
            
            <Card.Content>
              {errors.length > 0 && (
                <ErrorMessage>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </ErrorMessage>
              )}

              {error && (
                <ErrorMessage>
                  {error}
                </ErrorMessage>
              )}

              <form onSubmit={handleSubmit}>
                <FormSection>
                  <Input
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter listing title"
                    required
                  />
                </FormSection>

                <FormSection>
                  <Input
                    label="Neighborhood"
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    placeholder="Enter neighborhood"
                    required
                  />
                </FormSection>

                <FormSection>
                  <Select
                    label="Borough"
                    name="nycBorough"
                    value={formData.nycBorough}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Borough</option>
                    {boroughs.map((borough) => (
                      <option key={borough} value={borough}>
                        {borough}
                      </option>
                    ))}
                  </Select>
                </FormSection>

                <FormSection>
                  <Input
                    label="Price ($)"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    min="0"
                    required
                  />
                </FormSection>

                <FormSection>
                  <Input
                    label="Square Footage"
                    type="number"
                    name="sqFootage"
                    value={formData.sqFootage}
                    onChange={handleInputChange}
                    placeholder="Enter square footage"
                    min="0"
                    required
                  />
                </FormSection>

                <FormSection>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter contact email"
                    required
                  />
                </FormSection>

                <FormSection>
                  <Input
                    label="Description"
                    multiline
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter detailed description"
                    rows="4"
                    required
                  />
                </FormSection>

                <FormSection>
                  <h3>Images</h3>
                  <ImageUpload
                    imageFile={images.image1}
                    onImageChange={(file) => handleImageChange('image1', file)}
                    onImageRemove={() => handleImageRemove('image1')}
                    label="Primary Image"
                  />
                  <ImageUpload
                    imageFile={images.image2}
                    onImageChange={(file) => handleImageChange('image2', file)}
                    onImageRemove={() => handleImageRemove('image2')}
                    label="Image 2"
                  />
                  <ImageUpload
                    imageFile={images.image3}
                    onImageChange={(file) => handleImageChange('image3', file)}
                    onImageRemove={() => handleImageRemove('image3')}
                    label="Image 3"
                  />
                  <ImageUpload
                    imageFile={images.image4}
                    onImageChange={(file) => handleImageChange('image4', file)}
                    onImageRemove={() => handleImageRemove('image4')}
                    label="Image 4"
                  />
                  <ImageUpload
                    imageFile={images.image5}
                    onImageChange={(file) => handleImageChange('image5', file)}
                    onImageRemove={() => handleImageRemove('image5')}
                    label="Image 5"
                  />
                </FormSection>
              </form>
            </Card.Content>
            
            <Card.Actions align="center">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                onClick={handleSubmit}
              >
                Create Listing
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/listings')}
                disabled={loading}
              >
                Cancel
              </Button>
            </Card.Actions>
          </Card>
        </WrapperChild>
      </Wrapper>
    </ErrorBoundary>
  );
}

export default ListingsForm;