const acceptedProperties = ['background', 'borderImage', 'text'];

export default properties => properties.filter(property => acceptedProperties.includes(property));