import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, MapPin, Users, Tag, Plus, Trash2 } from 'lucide-react';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  location: z.string().min(1, 'Location is required'),
  price: z.number().min(0, 'Price must be 0 or greater'),
  vipPrice: z.number().min(0, 'VIP price must be 0 or greater'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
});

type EventFormData = z.infer<typeof eventSchema>;

const CreateEventPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      tags: [],
      price: 0,
      vipPrice: 0,
    }
  });
  
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      setValue('tags', updatedTags);
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    setValue('tags', updatedTags);
  };
  
  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to create the event
      console.log('Event data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the events page after successful creation
      navigate('/events');
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
            <p className="mt-1 text-sm text-gray-600">
              Fill in the details below to create your virtual event
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Event Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="mt-1 input w-full"
                      {...register('title')}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Event Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="mt-1 input w-full"
                      {...register('description')}
                    ></textarea>
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Date and Time */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Date and Time</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Start Date and Time
                    </label>
                    <input
                      type="datetime-local"
                      id="startDate"
                      className="mt-1 input w-full"
                      {...register('startDate')}
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      End Date and Time
                    </label>
                    <input
                      type="datetime-local"
                      id="endDate"
                      className="mt-1 input w-full"
                      {...register('endDate')}
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Location and Pricing */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Location and Pricing</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="mt-1 input w-full"
                      placeholder="Virtual"
                      {...register('location')}
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        General Price ($)
                      </label>
                      <input
                        type="number"
                        id="price"
                        min="0"
                        step="0.01"
                        className="mt-1 input w-full"
                        {...register('price', { valueAsNumber: true })}
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="vipPrice" className="block text-sm font-medium text-gray-700">
                        VIP Price ($)
                      </label>
                      <input
                        type="number"
                        id="vipPrice"
                        min="0"
                        step="0.01"
                        className="mt-1 input w-full"
                        {...register('vipPrice', { valueAsNumber: true })}
                      />
                      {errors.vipPrice && (
                        <p className="mt-1 text-sm text-red-600">{errors.vipPrice.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Event Tags</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a tag"
                      className="input flex-1"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="btn btn-primary"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-primary hover:text-primary/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  {errors.tags && (
                    <p className="text-sm text-red-600">{errors.tags.message}</p>
                  )}
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Event...' : 'Create Event'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;