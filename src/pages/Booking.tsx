_id: '1',
      title: 'Free Initial Consultation',
      description: 'A complimentary 30-minute session to discuss your goals and determine if coaching is right for you.',
      duration: 30,
      price: 0,
    },
    {
      _id: '2',
      title: 'Personal Development Coaching',
      description: 'Unlock your potential and overcome barriers to personal growth with tailored coaching sessions focused on self-awareness, goal setting, and developing new skills and perspectives.',
      duration: 60,
      price: 120,
    },
    {
      _id: '3',
      title: 'Career Coaching',
      description: 'Navigate career transitions, advance in your current role, or find greater job satisfaction with strategic coaching that helps you clarify goals, develop leadership skills, and create actionable plans.',
      duration: 60,
      price: 150,
    },
    {
      _id: '4',
      title: 'Life Balance Coaching',
      description: 'Create harmony between your professional ambitions and personal well-being with coaching that addresses stress management, boundary setting, and priorities alignment.',
      duration: 90,
      price: 180,
    }
  ];

  // Use fallback data if needed (for development purposes)
  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <div className="booking-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Book a Coaching Session</h1>
          <p className="page-description">
            Select a service and schedule your appointment
          </p>
        </div>
      </section>

      {/* Display success message if booking was successful */}
      {success && (
        <div className="container">
          <Alert type="success" title="Booking Confirmed" dismissible>
            {success}
          </Alert>
        </div>
      )}

      {/* Display error message if there was an error */}
      {error && (
        <div className="container">
          <Alert type="error" title="Error" dismissible>
            {error}
          </Alert>
        </div>
      )}

      {/* Booking Content */}
      <section className="booking-content">
        <div className="container">
          {/* Show loading state while fetching data */}
          {loading && (
            <Loading text="Loading services..." />
          )}

          {/* Display booking form when not loading */}
          {!loading && (
            <div className="booking-container">
              {/* Service Selection */}
              <div className="service-selection">
                <h2 className="section-title">Select a Service</h2>
                <div className="services-list">
                  {displayServices.map(service => (
                    <div 
                      key={service._id}
                      className={`service-option ${selectedService?._id === service._id ? 'selected' : ''}`}
                      onClick={() => handleServiceSelect(service._id)}
                    >
                      <div className="service-info">
                        <h3 className="service-title">{service.title}</h3>
                        <div className="service-details">
                          <span className="service-duration">{service.duration} minutes</span>
                          <span className="service-price">
                            {service.price === 0 
                              ? 'Free' 
                              : new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                }).format(service.price)
                            }
                          </span>
                        </div>
                      </div>
                      <div className="service-selection-indicator">
                        {selectedService?._id === service._id && (
                          <span className="selection-checkmark">✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment Booking Form */}
              {selectedService && (
                <div className="appointment-booking">
                  <h2 className="section-title">Schedule Your Appointment</h2>
                  <div className="selected-service-summary">
                    <h3>Selected Service: {selectedService.title}</h3>
                    <p>{selectedService.description}</p>
                    <div className="service-details">
                      <span className="service-duration">{selectedService.duration} minutes</span>
                      <span className="service-price">
                        {selectedService.price === 0 
                          ? 'Free' 
                          : new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(selectedService.price)
                        }
                      </span>
                    </div>
                  </div>
                  
                  {/* Appointment Form Component */}
                  <AppointmentForm 
                    serviceDuration={selectedService.duration}
                    onSubmit={handleBookAppointment}
                    isLoading={loading}
                  />
                </div>
              )}

              {/* Display message when no service is selected */}
              {!selectedService && !loading && (
                <div className="no-service-selected">
                  <p>Please select a service to schedule your appointment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="booking-faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3 className="faq-question">What happens after I book an appointment?</h3>
              <p className="faq-answer">
                After booking, you'll receive a confirmation email with all the details of your appointment.
                For virtual sessions, the email will include a link to the video conference. For in-person
                sessions, you'll receive the address and any additional instructions.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">How do I prepare for my first coaching session?</h3>
              <p className="faq-answer">
                Take some time to reflect on what you'd like to achieve through coaching. Consider the
                challenges you're facing, the goals you want to reach, and what success looks like for you.
                It's also helpful to find a quiet, comfortable space for virtual sessions where you won't be interrupted.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What's your cancellation policy?</h3>
              <p className="faq-answer">
                We understand that sometimes plans change. You can reschedule or cancel your appointment
                up to 24 hours before the scheduled time without any charge. For cancellations with less
                than 24 hours' notice, a 50% cancellation fee may apply.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;